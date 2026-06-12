import time

def list_membership(lst, target, iterations=10000):
    """
    Measures list membership time over a number of iterations.
    Time Complexity: O(N) per lookup.
    """
    start = time.perf_counter()
    for _ in range(iterations):
        _ = target in lst
    return time.perf_counter() - start

def set_membership(st, target, iterations=10000):
    """
    Measures set membership time over a number of iterations.
    Time Complexity: O(1) per lookup.
    """
    start = time.perf_counter()
    for _ in range(iterations):
        _ = target in st
    return time.perf_counter() - start

def run_membership_comparison(arr, target, iterations=10000):
    """
    Compares List membership check vs Set membership check.
    We convert the input array into a list and a set, then perform the check over `iterations` times.
    """
    # Prepare structures
    lst = list(arr)
    st = set(arr)
    
    # Run tests
    list_time = list_membership(lst, target, iterations)
    set_time = set_membership(st, target, iterations)
    
    results = {
        'list_membership': {
            'runtime': list_time,
            'complexity': 'O(N)',
            'display_name': 'List Membership'
        },
        'set_membership': {
            'runtime': set_time,
            'complexity': 'O(1)',
            'display_name': 'Set Membership'
        }
    }
    
    fastest = min(results, key=lambda k: results[k]['runtime'])
    
    return {
        'target': target,
        'iterations': iterations,
        'results': results,
        'fastest': results[fastest]['display_name']
    }
