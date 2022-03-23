def add_time(start, duration, day = None):
  # First we start by calculating the minutes and hours addition to add
  time_with_addition_to_add = calcul_time_to_add(start, duration)
  # Second we calculate the hours and days addition to add
  hours_with_addition_to_add = hours_calcul(start, time_with_addition_to_add)
  # Third we get the day
  days_result = calcul_days(day, hours_with_addition_to_add['next_days'])
  
  # Then we append the results together
  result = hours_with_addition_to_add['hours'] + ':' + hours_with_addition_to_add['minutes'] + ' ' + hours_with_addition_to_add['am_or_pm']

  # Check if we need to add the days
  if (days_result['empty'] == False):
    if bool(days_result['day']) == False:
      result += ' ' + days_result['next_days']
    else:
      result += ', ' + days_result['day']
      
      if (bool(days_result['next_days']) == True):
        result += ' ' + days_result['next_days']

  return result

def calcul_time_to_add(start, duration):
  start_minutes = int(start.split(' ')[0].split(':')[1])
  duration_minutes = int(duration.split(':')[1])
  minutes_sum = start_minutes + duration_minutes
  duration_hours = int(duration.split(':')[0])
  result = {
    'hours': duration_hours,
    'minutes': 0
  }

  if minutes_sum > 59:
    result['hours'] += 1
    result['minutes'] = minutes_sum - 60
  else:
    result['minutes'] = minutes_sum
  
  return result

def hours_calcul(start, time_to_add):
  result = {
    'hours': 0,
    'minutes': 0,
    'am_or_pm': '',
    'next_days': ''
  }
  am_or_pm = start.split(' ')[1]
  first_hours = int(start.split(' ')[0].split(':')[0])
  hours_to_add = time_to_add['hours']
  minutes_to_add = time_to_add['minutes']
  next_days = 0
  last_am_or_pm = ''
  
  while (hours_to_add > 0):
    hours_to_add -= 1
    first_hours += 1
    last_am_or_pm = am_or_pm

    if (first_hours == 12):
      if (last_am_or_pm == 'AM'):
        am_or_pm = 'PM'
      if (last_am_or_pm == 'PM'):
        am_or_pm = 'AM'
        next_days += 1

    if (first_hours == 13):
      if (am_or_pm == 'AM'):
        first_hours = 1
      if (am_or_pm == 'PM'):
        first_hours = 1
    
  result['hours'] = str(first_hours)
  result['minutes'] = str(minutes_to_add).rjust(2, '0')
  result['am_or_pm'] = am_or_pm
  result['next_days'] = next_days
    
  return result

def calcul_days(current_day, next_days):
  result = {
    'empty': True,
    'next_days': '',
    'day': ''
  }

  # Check if the next day is not demanded
  if bool(current_day) == False and next_days == 0:
    return result
    
  # Check if the next day is tomorrow and the day is not sent
  if (next_days == 1 and bool(current_day) == False):
    result['empty'] = False    
    result['next_days'] = '(next day)'

    return result

  # Otherwise we'll process it
  result['empty'] = False    
  
  days_array = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday']
  days_array_length = len(days_array)

  if (next_days == 1):
    result['next_days'] = '(next day)'
  elif (next_days > 1):
    result['next_days'] = '(' + str(next_days) + ' days later)'
    
  if (bool(current_day) == True):
    current_day = current_day.lower()
    day_index = days_array.index(current_day)
    
    while (next_days > 0):
      next_days -= 1
      day_index += 1
      
      if (day_index == days_array_length):
        day_index = 0

    result['day'] = days_array[day_index].capitalize()
  
  return result