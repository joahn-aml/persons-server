import { fakerSV as faker } from '@faker-js/faker'
import { Person } from '@/types/Person'
import format from 'date-fns/format'

export class PersonStore {
  persons: Person[] = []

  createRandomPerson(): Person {
    const person = {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      birthdate: format(
        faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
        'yyyy-MM-dd'
      ),
      title: faker.person.jobType(),
      license: faker.datatype.boolean(),
    }
    this.persons = [...this.persons, person]
    return person
  }

  removePerson(personId: string): string {
    this.persons = this.persons.filter(
      (person: Person) => person.id !== personId
    )
    return personId
  }

  removeAllPersons(): Person[] {
    this.persons = []
    return this.persons
  }
}

export const personStore = new PersonStore()
