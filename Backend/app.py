from flask import Flask, jsonify, request
import requests
from flask_cors import CORS
from flask import Flask, send_from_directory

#app = Flask(__name__)
app = Flask(__name__, static_folder="frontend/build", static_url_path="/")
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





# Route to serve the React static files
@app.route("/")
def serve_react():
    return send_from_directory(app.static_folder, "index.html")

# Route to serve the API
@app.route("/api/greet")
def greet():
    return {"message": "Hello from Flask!"}

# Handle React routing (any non-API routes)
@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_fol)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
