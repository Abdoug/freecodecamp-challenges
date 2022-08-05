class Category:
  maxLinePrintingLength = 30
  
  def __init__ (self, name):
    self.name = name
    self.ledger = []

  def __str__ (self):
      return self.printBalance()
      
  def deposit (self, amount, description = ""):
    self.ledger.append({"amount": amount, "description": description})

    return True

  def withdraw (self, amount, description = ""):
    # Check if we can withdraw the amount passed 
    if (self.check_funds(amount) == False):
      return False
    
    self.ledger.append({"amount": -amount, "description": description})
    
    return True

  def get_balance (self):
    init_sum = 0
    
    for x in self.ledger:
      init_sum += x["amount"]
    
    return init_sum

  def check_funds (self, amount):
    available_amount = self.get_balance()
    amount_difference = available_amount - amount

    return amount_difference >= 0

  def transfer (self, amount, categoryToTransferTo):
   # Check if we can withdraw the amount passed 
    if (self.check_funds(amount) == False):
      return False
    
    self.withdraw(amount, "Transfer to " + categoryToTransferTo.name)
    categoryToTransferTo.deposit(amount, "Transfer from " + self.name)

    return True
    
  def printBalance(self):
    restOfLineLength = (self.maxLinePrintingLength - len(self.name)) / 2
    leftToAdd = int(restOfLineLength)
    rightToAdd = int(self.maxLinePrintingLength - leftToAdd - len(self.name))
    totalAmounts = 0
    maxLeftLength = 23
    maxRightLength = 7
    lines = ""

    # Begin first line
    lines += "*".ljust(leftToAdd, "*") + self.name + "*".rjust(rightToAdd, "*") + "\n"
    # End first line
    # Begin other lines
    for x in self.ledger:
      totalAmounts += x["amount"]
      formattedDescription = str(x["description"])[0:maxLeftLength].ljust(maxLeftLength, " ")
      formattedAmount = str(format(x["amount"], ".2f"))[0:maxRightLength].rjust(maxRightLength, " ")

      lines += formattedDescription + formattedAmount + "\n"
    # End other lines
    # Begin last line
    lines += "Total: " + str(format(totalAmounts, ".2f"))
    # End last line

    return lines

def create_spend_chart(categories):
  categoriesWithrdawels = {}
  horizontalLabels = {
    "100" : "",
    "90" : "",
    "80" : "",
    "70" : "",
    "60" : "",
    "50" : "",
    "40" : "",
    "30" : "",
    "20" : "",
    "10" : "",
    "0" : "",
  }
  lines = "Percentage spent by category\n"
  sumOfWithdrawels = 0
  
  # Begin getting the sum of withdrawels of the categories
  for category in categories:
    name = category.name

    for ledger in category.ledger:
      amount = ledger["amount"]
      
      if amount > 0:
        continue

      sumOfWithdrawels += -amount
      categoriesWithrdawels[name] = 0
      
      if name in categoriesWithrdawels:
        categoriesWithrdawels[name] += -amount
      else:
        categoriesWithrdawels[name] = -amount

  for name in categoriesWithrdawels:
    percentageAmount = categoriesWithrdawels[name] * 100 / sumOfWithdrawels

    categoriesWithrdawels[name] = percentageAmount - (percentageAmount % 10)
  # End getting the sum of withdrawels of the categories

  # Begin printing the top block
  for horizontalLabel in horizontalLabels:
    horizontalLabels[horizontalLabel] += horizontalLabel.rjust(3, " ") + "|"
    
    for categoriesName in categoriesWithrdawels:
      amount = int(categoriesWithrdawels[categoriesName])
      
      if (amount >= int(horizontalLabel)):
        horizontalLabels[horizontalLabel] += " o "
      else:
        horizontalLabels[horizontalLabel] += "   "

    lines += horizontalLabels[horizontalLabel] + " \n"
  # End printing the top block
  # Begin printing the middle (dashes "-") block
  lines += "    " + "-".ljust(len(categoriesWithrdawels) * 3 + 1, "-") + "\n"
  # End printing the middle (dashes "-") block
  # Begin printing the bottom (names of categories) block
  lines += printCategoriesNames(categoriesWithrdawels.keys())
  # End printing the bottom (names of categories) block

  return lines

def printCategoriesNames (array, firstIteration = True):
  if (firstIteration == True):
    array = adjustElementsLength(array)
    
  arrayToBeReturned = []
  restArray = []
  lastFirstElement = ""
  lastRestElement = ""
  
  for element in array:
    firstCharacter = element[0] 
    restOfString = element[1:]

    arrayToBeReturned.append(firstCharacter)
      
    if (len(restOfString) > 0):
      restArray.append(restOfString)

    lastFirstElement = firstCharacter
    lastRestElement = restOfString
    
  arrayToBeReturned += "\n"
  array = arrayToBeReturned + restArray 

  if (checkIfAllValuesHasLengthOf(array, 1)):
    return getFormattedLines(array)
  else:
    return printCategoriesNames(array, False)

# This function accepts and of signle strings and print them
def getFormattedLines (array):
  lines = ""
  lastElement = ""
  
  for index, item in enumerate(array):
    # Check if we're in the first of new line
    if (index == 0 or lastElement == "\n"):
      lines += "     "

    # Check if we're in the end of line
    if (item == "\n"):
      lines += item
    else:
      lines += item + "  "

    lastElement = item
    
  return lines
    
# This function accepts an array and a length paramters to check whether all values contained in the array has that specific length passed. It returns True or False
def checkIfAllValuesHasLengthOf (array, lengthToCheck):
  for x in array:
    if (len(x) > lengthToCheck):
      return False

  return True

# This function accepts an array then map throw the array to adjust the length of the elements as the max length of the elements of the array. It returns the array of formatted elements
def adjustElementsLength (array):
  arrayToBeReturned = []
  arrayElementsMaxLength = max([len(i) for i in array])
  
  for element in array:
    arrayToBeReturned.append(element.ljust(arrayElementsMaxLength, " "))

  return arrayToBeReturned