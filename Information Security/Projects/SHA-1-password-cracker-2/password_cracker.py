import hashlib


def hash_password(password):
  return hashlib.sha1(password).hexdigest()


def decode_to_utf8(password):
  return password.decode("utf-8")


def read_from_file(filename):
  array_to_be_returned = []

  with open(filename, "rb") as file:
    line = file.readline().strip()

    while line:
      array_to_be_returned.append(line)
      line = file.readline().strip()

  return array_to_be_returned


def return_password_if_hash_exists(hash, dict_to_check):
  if hash in dict_to_check:
    return dict_to_check[hash]

  return "PASSWORD NOT IN DATABASE"


def crack_sha1_hash(hash, use_salts=False):
  passwords = read_from_file("top-10000-passwords.txt")

  if use_salts:
    salts_passwords = {}
    salts = read_from_file("known-salts.txt")

    for salt in salts:
      for password in passwords:
        appended = hash_password(password + salt)
        prepended = hash_password(salt + password)

        salts_passwords[appended] = decode_to_utf8(password)
        salts_passwords[prepended] = decode_to_utf8(password)

    return return_password_if_hash_exists(hash, salts_passwords)

  dictionary_of_passwords = {}

  for password in passwords:
    hashed = hash_password(password)

    dictionary_of_passwords[hashed] = decode_to_utf8(password)

  return return_password_if_hash_exists(hash, dictionary_of_passwords)