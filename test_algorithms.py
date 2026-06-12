import unittest
from algorithms.sorting import bubble_sort, merge_sort, quick_sort, run_sorting_comparison
from algorithms.searching import linear_search, binary_search, run_searching_comparison
from algorithms.membership import run_membership_comparison

class TestAlgorithms(unittest.TestCase):
    def test_sorting(self):
        arr = [5, 3, 8, 1, 2, 9, 3]
        expected = sorted(arr)
        
        self.assertEqual(bubble_sort(arr), expected)
        self.assertEqual(merge_sort(arr), expected)
        self.assertEqual(quick_sort(arr), expected)
        
        comparison = run_sorting_comparison(arr)
        self.assertEqual(comparison['sorted_array'], expected)
        self.assertIn('bubble_sort', comparison['results'])
        self.assertIn('merge_sort', comparison['results'])
        self.assertIn('quick_sort', comparison['results'])
        
    def test_searching(self):
        arr = [10, 20, 30, 40, 50]
        self.assertEqual(linear_search(arr, 30), 2)
        self.assertEqual(linear_search(arr, 60), -1)
        
        self.assertEqual(binary_search(arr, 30), 2)
        self.assertEqual(binary_search(arr, 60), -1)
        
        comparison = run_searching_comparison(arr, 30)
        self.assertTrue(comparison['found'])
        self.assertEqual(comparison['results']['linear_search']['index'], 2)
        self.assertEqual(comparison['results']['binary_search']['index'], 2)
        
    def test_membership(self):
        arr = [1, 2, 2, 3, 4, 4, 5]
        comparison = run_membership_comparison(arr, 4, iterations=10)
        self.assertIn('list_membership', comparison['results'])
        self.assertIn('set_membership', comparison['results'])

if __name__ == '__main__':
    unittest.main()
