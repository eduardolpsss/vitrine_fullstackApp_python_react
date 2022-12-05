from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# API membros
@app.route("/cars")
def cars():
    return{
   "cars":[
      {
         "id":"1",
         "createdAt":"27/03/2019",
         "title":"Fiat Strada MPI HARD WORKING CE",
         "year": "2018",
         "kilometre": "74.630",
         "city": "São Paulo",
         "media":"/static/images/cars/carro1.jpeg",
         "price":"58.699"
      },
      {
         "id":"2",
         "createdAt":"31/03/2019",
         "title":"Chevrolet Onix MPFI JOY",
         "year": "2017",
         "kilometre": "93.550",
         "city": "São Paulo",
         "media":"/static/images/cars/carro2.jpeg",
         "price":"44.699"
      },
      {
         "id":"3",
         "createdAt":"03/04/2019",
         "title":"Bmw 320i SPORT GP TURBO ACTIVE",
         "year": "2018",
         "kilometre": "60.163",
         "city": "São Paulo",
         "media":"/static/images/cars/carro3.jpeg",
         "price":"147.699"
      },
      {
         "id":"4",
         "createdAt":"04/04/2019",
         "title":"Mercedes Benz B 200 SPORT TURBO",
         "year": "2015",
         "kilometre": "69.943",
         "city": "São Paulo",
         "media":"/static/images/cars/carro4.jpeg",
         "price":"86.199"
      },
      {
         "id":"5",
         "createdAt":"04/04/2019",
         "title":"Hyunday Creta PULSE PLUS",
         "year": "2018",
         "kilometre": "50.320",
         "city": "São Paulo",
         "media":"/static/images/cars/carro5.jpeg",
         "price":"88.199"
      },
      {
         "id":"6",
         "createdAt":"04/04/2019",
         "title":"Audi Q3 TFSI AMBIENTE",
         "year": "2017",
         "kilometre": "71.581",
         "city": "São Paulo",
         "media":"/static/images/cars/carro6.jpeg",
         "price":"109.699"
      }
   ]
}

if __name__ == "__main__":
    app.run(debug=True)