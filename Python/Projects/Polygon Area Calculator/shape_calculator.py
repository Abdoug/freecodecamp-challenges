class Rectangle:
  def __init__ (self, width, height):
    self.set_width(width)
    self.set_height(height)

  def __str__ (self):
    return "Rectangle(width=" + str(self.width) + ", height=" + str(self.height) + ")"
    
  def set_width (self, width):
    self.width = width

  def set_height (self, height):
    self.height = height

  def get_area (self):
    return self.width * self.height

  def get_perimeter (self):
    return 2 * self.width + 2 * self.height

  def get_diagonal (self):
    return (self.width ** 2 + self.height ** 2) ** 0.5

  def get_picture (self):
    if (self.width > 50 or self.height > 50):
      return "Too big for picture."

    heightIterations = self.height
    widthIterations = self.width
    lines = ""
    
    while (heightIterations > 0):
      while (widthIterations > 0):
        lines += "*"
        
        widthIterations -= 1

      lines += "\n"
      heightIterations -= 1
      widthIterations = self.width

    return lines

  def get_amount_inside (self, shape):
    if (self.width == shape.width and self.height == shape.height):
      return 1
      
    widthRequired = int(self.width / shape.width)
    heightRequired = int(self.height / shape.height)

    return round(widthRequired * heightRequired)
    
class Square(Rectangle):
  def __init__ (self, side):
    self.set_side(side)

  def __str__ (self):
    return "Square(side=" + str(self.width) + ")"
    
  def set_side (self, side):
    self.set_height(side)
    self.set_width(side)