# This entrypoint file to be used in development. Start by reading README.md
import budget
#from budget import create_spend_chart
from unittest import main

#food = budget.Category("Food")
#food.deposit(1000, "initial deposit")
#food.withdraw(10.15, "groceries")
#food.withdraw(15.89, "restaurant and more food for dessert")
#print(food.get_balance())
#clothing = budget.Category("Clothing")
#food.transfer(50, clothing)
#clothing.withdraw(25.55)
#clothing.withdraw(100)
#auto = budget.Category("Auto")
#auto.deposit(1000, "initial deposit")
#auto.withdraw(15)

Audi = budget.Category('Audi')
BMW = budget.Category('BMW')

Audi.deposit(500, "Hey1")
Audi.withdraw(400, "Hey2")

Audi.transfer(50, BMW)
BMW.deposit(500, "Hey1")

#print(Audi.name)
#print(BMW.name)

#print(Audi.printBalance())
print(BMW.printBalance())

# print(food)
# print(clothing)

# print(create_spend_chart([food, clothing, auto]))

# Run unit tests automatically
# main(module='test_module', exit=False)