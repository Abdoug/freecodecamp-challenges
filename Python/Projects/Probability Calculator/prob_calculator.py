import copy
import random
# Consider using the modules imported above.

class Hat:
  ballsGroup = {}
  
  def __init__ (self, **arguments):
    self.contents = []
    self.ballsGroup = arguments

    for ball in arguments:
      ballCount = arguments[ball]

      while (ballCount > 0):
        self.contents.append(ball)
        
        ballCount -= 1

  def draw (self, numberToBeDrawn):
    copiedContents = copy.copy(self.contents)
    contentsLength = len(copiedContents)
    arrayToBeReturned = []

    if (contentsLength <= numberToBeDrawn):
      return copiedContents

    while (numberToBeDrawn > 0):
      randomIndex = random.randint(0, len(copiedContents) - 1)
      
      elementToAdd = copiedContents.pop(randomIndex)
      self.contents.pop(randomIndex)
      arrayToBeReturned.append(elementToAdd)
      
      numberToBeDrawn -= 1

    return arrayToBeReturned
  
def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
  copiedNumExperiments = copy.copy(num_experiments)
  probability = 0

  while (copiedNumExperiments > 0):
    copiedHat = copy.deepcopy(hat)
    randomDrawnBalls = copiedHat.draw(num_balls_drawn)
    probabilityGotten = True

    for ball in expected_balls:
      drawnTimes = randomDrawnBalls.count(ball)

      if (drawnTimes >= expected_balls[ball]):
        continue
      else:
        probabilityGotten = False
        break
        
    if (probabilityGotten == True):
      probability += 1

    copiedNumExperiments -= 1

  return (probability / num_experiments)
