from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)   #initialize the flask app
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'   #configure the app to use SQLite database sfrom data.db
db = SQLAlchemy(app)   #binding

class Item(db.Model):   #defines the structure of the Item model
  id = db.Column(db.Integer, primary_key=True)   # primary key
  name = db.Column(db.String(30), unique=True, nullable=False)
  quantity = db.Column(db.Integer)


def repr(self):   #provides a representation of the object when printed
  return f"{self.name} {self.quantity}"

@app.route('/groceries')   #route where the list of items will be

def get_groceries():
  
