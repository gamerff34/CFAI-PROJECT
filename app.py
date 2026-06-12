import os
from flask import Flask, render_template, request, jsonify
from algorithms.sorting import run_sorting_comparison
from algorithms.searching import run_searching_comparison
from algorithms.membership import run_membership_comparison

app = Flask(__name__)

# Basic routing
@app.route('/')
def index():
    return render_template('index.html')

# Sorting comparison endpoint
@app.route('/api/sort', methods=['POST'])
def compare_sort():
    try:
        data = request.get_json()
        if not data or 'array' not in data:
            return jsonify({'error': 'Missing array data'}), 400
        
        raw_array = data['array']
        if not isinstance(raw_array, list):
            return jsonify({'error': 'Input must be a list of numbers'}), 400
            
        if not raw_array:
            return jsonify({'error': 'Array cannot be empty'}), 400
            
        # Parse elements to floats (or ints where possible)
        try:
            array = [float(x) for x in raw_array]
        except ValueError:
            return jsonify({'error': 'All array elements must be valid numbers'}), 400
            
        # Run sorting comparison
        comparison_results = run_sorting_comparison(array)
        return jsonify(comparison_results)
        
    except Exception as e:
        return jsonify({'error': f'An unexpected error occurred: {str(e)}'}), 500

# Searching comparison endpoint
@app.route('/api/search', methods=['POST'])
def compare_search():
    try:
        data = request.get_json()
        if not data or 'array' not in data or 'target' not in data:
            return jsonify({'error': 'Missing array or target data'}), 400
            
        raw_array = data['array']
        raw_target = data['target']
        
        if not isinstance(raw_array, list):
            return jsonify({'error': 'Input array must be a list of numbers'}), 400
            
        if not raw_array:
            return jsonify({'error': 'Array cannot be empty'}), 400
            
        # Parse array and target
        try:
            array = [float(x) for x in raw_array]
            target = float(raw_target)
        except ValueError:
            return jsonify({'error': 'Array elements and target must be valid numbers'}), 400
            
        # Run searching comparison
        comparison_results = run_searching_comparison(array, target)
        return jsonify(comparison_results)
        
    except Exception as e:
        return jsonify({'error': f'An unexpected error occurred: {str(e)}'}), 500

# Membership comparison endpoint
@app.route('/api/membership', methods=['POST'])
def compare_membership():
    try:
        data = request.get_json()
        if not data or 'array' not in data or 'target' not in data:
            return jsonify({'error': 'Missing array or target data'}), 400
            
        raw_array = data['array']
        raw_target = data['target']
        iterations = int(data.get('iterations', 10000))
        
        if not isinstance(raw_array, list):
            return jsonify({'error': 'Input array must be a list of numbers'}), 400
            
        if not raw_array:
            return jsonify({'error': 'Array cannot be empty'}), 400
            
        # Limit iterations to avoid abuse/timeouts
        if iterations <= 0 or iterations > 100000:
            iterations = 10000
            
        # Parse array and target
        try:
            array = [float(x) for x in raw_array]
            target = float(raw_target)
        except ValueError:
            return jsonify({'error': 'Array elements and target must be valid numbers'}), 400
            
        # Run membership comparison
        comparison_results = run_membership_comparison(array, target, iterations)
        return jsonify(comparison_results)
        
    except Exception as e:
        return jsonify({'error': f'An unexpected error occurred: {str(e)}'}), 500

if __name__ == '__main__':
    # Determine port from environment or default to 5000
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
