# Expected knowledge to resolve the assignment:
# objected oriented programming in Python
# classes
# composition
# Inheritance
# polymorphism


# 1. Implement a class named "MyClass"
# This class should have:
# * During instantiation of this class, the 'some_val' parameter should be set as
#   a variable with the same name in the instance
# * Implement the method called 'plus_n' that takes one parameter (named 'n'), such that
#   it should return the sum of instance's 'some_val' variable and 'n'
class MyClass:
    def __init__(self, some_val):
        # your code goes here instead of pass
        self.some_val = some_val

    def plus_n(self, n):
        # your code goes here instead of pass
        return n + self.some_val


#####################################################################################################################
#####################################################################################################################

# 2. Given two classes 'Animal' and 'DigestiveSystem, implement, using COMPOSITION the method 'eat_food' in the 'Animal' class.
# * Animal instances should have a 'diggestive_system' attribute, which is the DigestiveSystem instance of that object.
# * The eat_food method should PROCESS any 'food' (any string) that are not allergenic (use the method 'has_allergy' to check for this case)
# * The DigestiveSystem is a class responsible for the PROCESS of any food eaten,
#       so make use of this in the Animal.eat_food method (remember COMPOSITION!)

class DigestiveSystem:
    """This class is already done for you
    don't changea any code on it.
    """
    def process_food(self, food):
        return f'processed-{food}'


class Animal:
    def __init__(self):
        self.diggestive_system = DigestiveSystem()

    def has_allergy(self, food):
        if food.lower() in ['peanut', 'milk']:
            return True
        return False

    def eat_food(self, food):
        """
        The 'food' parameter is just a string, such as 'apple', 'pear' or 'peanut'
        """

        if self.has_allergy(food) == False:
            return self.diggestive_system.process_food(food)


#####################################################################################################################
#####################################################################################################################


# 3. Rewrite the Human class bellow (without changing it's name), so that it inherits from the Animal class of the exercice 2.
# * You should override the 'has_allergy' method in the Human class, so that it now only returns True if the food is 'peanut'

class Human(Animal):
    def has_allergy(self, food):
        if food.lower() in ['peanut']:
            return True
        return False




#####################################################################################################################
#####################################################################################################################

# 4. Implement the Child class below, which inherets from Human (from exercice 3).
# * Instances of Child need to have a 'toy' attribute (string), which is defined during instantiation
# * This class should also have a 'playing_with_toy' method, which should return the 'toy' (string) that the Child has.
# * Other than that, a Child should behave exactly like a Human instance, so make sure it is inheriting all the logic from its parents '__init__' method



class Child(Human):

    def __init__(self, toy):
        self.toy = toy
        Human.__init__(self)

    def playing_with_toy(self):
        return self.toy


if __name__ == '__main__':
    my_instance = MyClass(some_val=90)
    assert my_instance.some_val == 90

    another_instance = MyClass(some_val=100)
    assert another_instance.plus_n(3) == 103


    animal = Animal()
    assert isinstance(animal.digestive_system, DigestiveSystem)

    assert animal.eat_food('banana') == 'processed-banana'
    assert animal.eat_food('milk') == 'milk'
    assert animal.eat_food('peanut') == 'peanut'


    human = Human()
    assert isinstance(human, Animal)
    assert human.has_allergy('milk') == False
    assert human.has_allergy('peanut') == True

    child = Child('some-toy')
    assert isinstance(child, Human)
    assert child.has_allergy('milk') == False
    assert child.has_allergy('peanut') == True

    assert isinstance(child.digestive_system, DigestiveSystem)

    assert child.eat_food('banana') == 'processed-banana'
    assert child.eat_food('milk') == 'processed-milk'
    assert child.eat_food('peanut') == 'peanut'

    print('All my tests passed')