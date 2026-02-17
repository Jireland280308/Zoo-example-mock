from flask import Flask, request, render_template, redirect, session
import mysql.connector
import sqlite3
import bcrypt

app = Flask(__name__)

app.secret_key = "SecretKey"

# Assigns the database file to a variable
DB = "database.db"


# Connecting to the database

def ConnectToDB():
    global conn, cursor
    conn = sqlite3.connect(DB)
    cursor = conn.cursor()

# Break the connection

def DisconnectDB():
    cursor.close()
    conn.close()



# Check if connection to the database works

try:
    ConnectToDB()
    DisconnectDB()
except mysql.connector.Error as err:
    print("Error:", err)


@app.route("/")

@app.route("/signup", methods=["GET", "POST"])
def Signup():
    if request.method == "POST":
        # Get form values

        firstname = request.form.get("firstname")
        email = request.form.get("email")

        # Hash password
        password = request.form.get("password")

        hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

        ConnectToDB()

        # Check if email already exists

        query = "Select * From Account Where LOWER(Email) = LOWER(?)"

        if cursor.execute(query, (email,)).fetchone():
            print("Email already in use")
            DisconnectDB()
        
        else:
            query = """
            INSERT INTO Account
            (Firstname, Email, Password)
            VALUES (?,?,?)
            """
            
            values = (firstname, email, hashed)

            conn.execute(query,values)

            conn.commit()


            DisconnectDB()

            return redirect("/login")

    return render_template("signup.html")







@app.route("/login", methods = ["GET", "POST"])
def Login():
    if request.method == "POST":

        email = request.form.get("email")
        password = request.form.get("password")

        ConnectToDB()

        #Check if Username exists

        query = "Select * From Account WHERE LOWER(Email) = LOWER(?)"
        user = cursor.execute(query, (email,)).fetchone()

        DisconnectDB()
        if user:
            stored_pass = user[3]

            # Compare hashed passwords
            if bcrypt.checkpw(password.encode("utf-8"), stored_pass):
                session["user"] = user[0]
                return redirect("/index")
            # Check if bcrypted password match db password

            else:
                print("Email or Password is incorrect")

    return render_template("login.html")




if __name__ == '__main__':
    app.run(debug=True)