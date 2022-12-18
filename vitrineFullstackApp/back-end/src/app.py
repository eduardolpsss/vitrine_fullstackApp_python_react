from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson import ObjectId
import json
import jwt
from datetime import datetime, timedelta
from flask_bcrypt import Bcrypt
from functools import wraps

app = Flask(__name__)
app.config['MONGO_URI'] ='mongodb://localhost/pythonReactCarsData'
mongo = PyMongo(app)

CORS(app)

bcrypt = Bcrypt(app)
secret = "***************"

# Database
db = mongo.db.cars

def tokenReq(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if "Authorization" in request.headers:
            token = request.headers["Authorization"]
            try:
                jwt.decode(token, secret)
            except:
                return jsonify({"status": "fail", "message": "unauthorized"}), 401
            return f(*args, **kwargs)
        else:
            return jsonify({"status": "fail", "message": "unauthorized"}), 401
    return decorated

# Index route
@app.route('/')
def func():
    return "vitrine_fullstackApp_python_react back-end, bem vindo!", 200

@app.route('/admin', methods=['POST'])
def createAdmins():
    message = ""
    code = 500
    status = "fail"
    try:
        data = request.get_json()
        # Verificar e-mail comentado por problemas no check.count
        # check = db['admins'].find({"email": data['email']})
        # if check.count() >= 1:
        #     message = "user with that email exists"
        #     code = 401
        #     status = "fail"
        # else:
        # Utilizando hashing na senha para que ela não seja visível no banco de dados 
        data['role'] = 'admin'
        data['password'] = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        data['created'] = datetime.now()
        
        res = db["admins"].insert_one(data) 
        if res.acknowledged:
            status = "successful"
            message = "Usuário admin cadastrado com sucesso."
            code = 201
    except Exception as ex:
        message = f"{ex}"
        status = "fail"
        code = 500
    return jsonify({'status': status, "message": message}), 200

@app.route('/admin', methods=['GET'])
def getLogin():
    message = ""
    res_data = {}
    code = 500
    status = "fail"

    admin = []

    for doc in db.admins.find(): 
        admin.append({
            # "_id": str(ObjectId(doc["_id"])),
            "email": doc["email"],
            "password": doc["password"],
            "username": doc["username"],
            "role": doc["role"],
            "created": doc["created"]
        })
    return  jsonify(admin)

@app.route('/login', methods=['POST'])
def login():
    message = ""
    res_data = {}
    code = 500
    status = "fail"
    try:
        data = request.get_json()
        admin = db['admins'].find_one({"email": f'{data["email"]}'})

        if admin:
            admin['_id'] = str(admin['_id'])
            if admin and bcrypt.check_password_hash(admin['password'], data['password']):
                time = datetime.utcnow() + timedelta(hours=24)
                token = jwt.encode({
                        "admin": {
                            "email": f"{admin['email']}",
                            "id": f"{admin['_id']}",
                        },
                        "exp": time
                    },secret)

                # del admin['password']
                 
                message = f"Administrador do sistema autenticado com sucesso."
                code = 200
                status = "successful"
                res_data['email'] = admin['email']
                res_data['username'] = admin['username']
                res_data['role'] = admin['role']
                res_data['token'] = token

                res_data['admin'] = admin 

                #res_data = db["admins"].insert_one(data)

            else:
                message = "Senha incorreta."
                code = 401
                status = "fail"
        else:
            message = "Informações de login inválidas."
            code = 401
            status = "fail"

    except Exception as ex:
        message = f"{ex}"
        code = 500
        status = "fail"
    return jsonify({'status': status, "data": res_data, "message":message, "code":code})

@app.route('/login', methods=['GET'])
def getAdminLogInfos():
    message = ""
    res_data = {}
    code = 500
    status = "fail"

    adminLogInfos = []

    for doc in db.login.find(): 
        adminLogInfos.append({
            "_id": str(ObjectId(doc["_id"])),
            "email": doc["email"],
            "username": doc["username"],
            "token": doc["token"],
            "role": doc["role"]
        })
    return  jsonify(adminLogInfos)

# Cars CRUD Routes
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