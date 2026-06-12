import time
import random

def bubble_sort(arr):
    """
    Bubble Sort algorithm.
    Time Complexity: O(N^2) average/worst, O(N) best (if already sorted).
    Space Complexity: O(1).
    """
    n = len(arr)
    arr_copy = list(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr_copy[j] > arr_copy[j + 1]:
                arr_copy[j], arr_copy[j + 1] = arr_copy[j + 1], arr_copy[j]
                swapped = True
        if not swapped:
            break
    return arr_copy

def merge_sort(arr):
    """
    Merge Sort algorithm.
    Time Complexity: O(N log N) all cases.
    Space Complexity: O(N).
    """
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return _merge(left, right)

def _merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

def quick_sort(arr):
    """
    Quick Sort algorithm (using middle element as pivot to mitigate sorted array issues).
    Time Complexity: O(N log N) average/best, O(N^2) worst.
    Space Complexity: O(log N) stack space.
    """
    if len(arr) <= 1:
        return arr
    # Using middle element as pivot
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

def run_sorting_comparison(arr):
    """
    Compares Bubble Sort, Merge Sort, and Quick Sort on the given array.
    Measures execution time using time.perf_counter().
    Returns sorted array and profiling stats.
    """
    results = {}
    
    # 1. Bubble Sort
    start = time.perf_counter()
    bubble_res = bubble_sort(arr)
    bubble_time = time.perf_counter() - start
    results['bubble_sort'] = {
        'runtime': bubble_time,
        'complexity': 'O(N^2)',
        'display_name': 'Bubble Sort'
    }
    
    # 2. Merge Sort
    start = time.perf_counter()
    merge_res = merge_sort(arr)
    merge_time = time.perf_counter() - start
    results['merge_sort'] = {
        'runtime': merge_time,
        'complexity': 'O(N log N)',
        'display_name': 'Merge Sort'
    }
    
    # 3. Quick Sort
    start = time.perf_counter()
    quick_res = quick_sort(arr)
    quick_time = time.perf_counter() - start
    results['quick_sort'] = {
        'runtime': quick_time,
        'complexity': 'O(N log N)',
        'display_name': 'Quick Sort'
    }
    
    # Determine the fastest algorithm
    fastest = min(results, key=lambda k: results[k]['runtime'])
    
    return {
        'sorted_array': quick_res,  # any sorted result
        'results': results,
        'fastest': results[fastest]['display_name']
    }
