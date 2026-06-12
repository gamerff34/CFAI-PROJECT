import time

def linear_search(arr, target):
    """
    Linear Search algorithm.
    Time Complexity: O(N).
    Space Complexity: O(1).
    """
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

def binary_search(sorted_arr, target):
    """
    Binary Search algorithm (iterative).
    Assumes array is already sorted.
    Time Complexity: O(log N).
    Space Complexity: O(1).
    """
    low = 0
    high = len(sorted_arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if sorted_arr[mid] == target:
            return mid
        elif sorted_arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

def run_searching_comparison(arr, target):
    """
    Compares Linear Search and Binary Search on the given array.
    For Binary Search, the array is sorted first, but the sorting time is NOT measured.
    Returns whether found, the indices, and runtime profiles.
    """
    # 1. Linear Search
    start = time.perf_counter()
    linear_idx = linear_search(arr, target)
    linear_time = time.perf_counter() - start
    
    # 2. Binary Search
    # Sort the array beforehand so we only measure the binary search operation
    sorted_arr = sorted(arr)
    start = time.perf_counter()
    binary_idx = binary_search(sorted_arr, target)
    binary_time = time.perf_counter() - start
    
    found = (linear_idx != -1)
    
    # Since binary search works on sorted array, the index returned is in the sorted array.
    # We will report the original index for linear search and the sorted index for binary search, or just simple true/false status.
    
    results = {
        'linear_search': {
            'runtime': linear_time,
            'complexity': 'O(N)',
            'display_name': 'Linear Search',
            'index': linear_idx
        },
        'binary_search': {
            'runtime': binary_time,
            'complexity': 'O(log N)',
            'display_name': 'Binary Search',
            'index': binary_idx
        }
    }
    
    fastest = min(results, key=lambda k: results[k]['runtime'])
    
    return {
        'found': found,
        'results': results,
        'fastest': results[fastest]['display_name']
    }
