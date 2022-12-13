from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS

from bson import ObjectId

# Instantiation
app = Flask(__name__)
app.config['MONGO_URI'] ='mongodb://localhost/pythonReactCarsData'
mongo = PyMongo(app)

# Settings
CORS(app)

# Database
db = mongo.db.cars

# CRUD Routes
@app.route('/cars', methods=['POST'])
def createCars():
    id = db.insert_one({
        "media": request.json["media"],
        "title": request.json["title"],
        "brand": request.json["brand"],
        "year": request.json["year"],
        "kilometre": request.json["kilometre"],
        "city": request.json["city"],
        "price": request.json["price"]
    })
    return jsonify(str(id.inserted_id))

@app.route('/cars', methods=['GET'])
def getCars():
    cars = []
    
    for doc in db.find(): 
        cars.append({
            "_id": str(ObjectId(doc["_id"])),
            "media": doc["media"],
            "title": doc["title"],
            "brand": doc["brand"],
            "year": doc["year"],
            "kilometre": doc["kilometre"],
            "city": doc["city"],
            "price": doc["price"]
        })
    return  jsonify(cars)

@app.route('/car/<id>', methods=['GET'])
def getCar(id):
    car = db.find_one({"_id": ObjectId(id)})
    print(car)
    return jsonify({
        "_id": str(ObjectId(car["_id"])),
        "media": car["media"],
        "title": car["title"],
        "brand": car["brand"],
        "year": car["year"],
        "kilometre": car["kilometre"],
        "city": car["city"],
        "price": car["price"]
    })

@app.route('/car/<id>', methods=['DELETE'])
def deleteCar(id):
    db.delete_one({"_id": ObjectId(id)})
    return jsonify({"msg": "Anúncio deletado com sucesso."})

@app.route('/car/<id>', methods=['PUT'])
def UpdateCar(id):
    db.update_one({"_id": ObjectId(id)}, {"$set": {
        "media": request.json["media"],
        "title": request.json["title"],
        "brand": request.json["brand"],
        "year": request.json["year"],
        "kilometre": request.json["kilometre"],
        "city": request.json["city"],
        "price": request.json["price"]          
    }})
    return jsonify({"msg": "Anúncio atualizado com sucesso."})

if __name__ == "__main__":
    app.run(debug=True)