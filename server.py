from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)   #initialize the flask app
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'   #configure the app to use SQLite database sfrom data.db
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///C:/Users/username/Desktop/folder/Shopping list/shopping_list2.db'   #configure the app to use SQLite database sfrom data.db

db = SQLAlchemy(app)   #binding

class Item(db.Model):   #defines the structure of the Item model
    id = db.Column(db.Integer, primary_key=True)   # primary key
    name = db.Column(db.String(50), unique=True, nullable=False)
    quantity = db.Column(db.Float, nullable=False)                           ### ??? check, did i put that in SQL? 
    crossed_out = db.Column(db.Integer, default=0)
    by_sina = db.Column(db.Integer, default=0)
    emoji_id = db.Column(db.Integer, db.ForeignKey('emoji.id'))





def repr(self):   #provides a representation of the object when printed
    return f"{self.name} {self.quantity}"

@app.route('/groceries', methods=['GET'])   #route where the list of items will be

def get_groceries():
    groceries = Item.query.all()
    items = []
    for item in groceries:
        items.append({   #JSON format
            'id': item.id,
            'name': item.name,
            'quantity': item.name,
            'crossed_out': item.crossed_out,
            'by_sina': item.by_sina,
            'emoji_id': item.emoji_id
        })
    return {items}



@app.route('/groceries', methods=[''])
def add_grocery():



@app.route('/groceries', methods=[''])
def update_grocery(id):



@app.route('/groceries', methods=[''])
def delete_grocery(id):
