import re

def arithmetic_arranger(problems, show_the_results = None):
  check_result = checker(problems)
  
  # Check if there are some errors to print them out
  if check_result['status'] == False:
    return check_result['error']

  show_the_results = bool(show_the_results)

  # Otherwise we'll process the calculs
  return calcul(problems, show_the_results)

def calcul(problems, show_the_results):
  first_row = ''
  second_row = ''
  third_row = ''
  fourth_row = ''

  for index, problem in enumerate(problems):
    problem_splitted = []
    operator = '+'
    problem_is_last = bool(index == len(problems) - 1)
    
    if bool(re.match('^([0-9]{1,4} [+] [0-9]{1,4})$', problem)) == True:
      problem_splitted = problem.split(' + ')
      operator = '+'
    else:
      problem_splitted = problem.split(' - ')
      operator = '-'

    max_length = max(len(problem_splitted[0]), len(problem_splitted[1]))
    first_row += problem_splitted[0].rjust(max_length + 2)
    second_row += operator + problem_splitted[1].rjust(max_length + 1)
    third_row += '-'.rjust(max_length + 2, '-')

    if (problem_is_last == False):
      first_row += '    '
      second_row += '    '
      third_row += '    '
      
    if show_the_results == True:
      if operator == '+':
        result = int(problem_splitted[0]) + int(problem_splitted[1])
      elif operator == '-':
        result = int(problem_splitted[0]) - int(problem_splitted[1])

      fourth_row += (str(result)).rjust(max_length + 2)
      if (problem_is_last == False): fourth_row += '    '
    
    final_row = first_row + '\n' + second_row + '\n' + third_row

    if (bool(fourth_row) == True):
      final_row += '\n' + fourth_row

  return final_row

def checker(problems):
  result = {
    'status': True,
    'error': '',
  }
  
  # Check the length of the problems array
  if (bool(len(problems) > 5) == True):
    result['error'] = 'Error: Too many problems.'
    result['status'] = False
    
    return result
  
  for problem in problems:
    initial_check = bool(re.match('^([0-9]{1,4} [+|-] [0-9]{1,4})$', problem))
    problem_splitted = []
    operator = ''
    
    if bool(' + ' in problem) == True:
      problem_splitted = problem.split(' + ')
      operator = '+'
    elif bool(' - ' in problem) == True:
      problem_splitted = problem.split(' - ')
      operator = '-'

    if initial_check == False:
      result['status'] = False

      # Check for operators which are different of '+' and '-'
      operators_has_error = bool(re.match('^((?![+|-]).)*$', problem)) == True
      # Check for the operands if they contains only digits
      numbers_are_digits = True
      # Check for the operands if they contains ohas the length of max: 8
      numbers_has_correct_length = True

      if operator == '+' or operator == '-':
        numbers_are_digits = bool(re.match('^[0-9]+$', problem_splitted[0] or '')) == True and bool(re.match('^[0-9]+$', problem_splitted[1] or '')) == True
        numbers_has_correct_length = bool(len(problem_splitted[0] or '') > 4 or len(problem_splitted[1] or '') > 4) == False

      if operators_has_error == True:
        result['error'] = 'Error: Operator must be \'+\' or \'-\'.'

      if numbers_are_digits == False:
        result['error'] = 'Error: Numbers must only contain digits.'
      
      if numbers_has_correct_length == False:
        result['error'] = 'Error: Numbers cannot be more than four digits.'

      if operators_has_error == False and numbers_are_digits == True and numbers_has_correct_length == True:
        result['error'] = 'Error: Something went wrong.'
      
  return result