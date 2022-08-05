# This entrypoint file to be used in development. Start by reading README.md
import shape_calculator
from unittest import main

rect = shape_calculator.Rectangle(3, 6)

rect2 = shape_calculator.Rectangle(4, 8)
actual = rect2.get_amount_inside(rect)

print(actual == 1)
# Run unit tests automatically
main(module='test_module', exit=False)