from flask import Flask, jsonify, request
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from React frontend

# Dictionary for available locations and their IDs
locations = {
    "Bangalore": 7,
    "Hyderabad": 3,
    "Chennai": 6,
    "Ananthapur": 112,
    "Tadipatri": 790
    # Add more locations and their IDs as needed
}

def get_abhibus_data(source, destination, jdate):
    # Check if source and destination are valid
    if source not in locations or destination not in locations:
        return {"error": "Invalid source or destination"}

    # Get the corresponding IDs for the source and destination
    source_id = locations[source]
    destination_id = locations[destination]

    url = "https://www.abhibus.com/wap/GetBusList"
    payload = {
        "source": source,
        "sourceid": source_id,
        "destination": destination,
        "destinationid": destination_id,
        "jdate": jdate,
        "filters": 1,
        "isReturnJourney": "0",
        "prd": "mobile",
        "exp_ixigo_payment": "false",
        "exp_service_cards": "1",
        "exp_srp_outlier": "no",
    }
    response = requests.post(url, data=payload)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": f"Failed to fetch data. Status code: {response.status_code}"}

@app.route('/get_buses', methods=['GET'])
def get_buses():
    source = request.args.get('source')
    destination = request.args.get('destination')
    jdate = request.args.get('jdate')
    
    if not source or not destination or not jdate:
        return jsonify({"error": "Missing required parameters"}), 400

    bus_data = get_abhibus_data(source, destination, jdate)
    return jsonify(bus_data)

if __name__ == '__main__':
    app.run(debug=True)
