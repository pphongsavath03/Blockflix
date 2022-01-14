const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Marvel' },
    { name: 'Star Wars' },
    { name: 'Harry Potter' },
    { name: 'All Movies' },
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Captain America: The First Avenger ',
      description:
        'It is 1941 and the world is in the throes of war. Steve Rogers (Chris Evans) wants to do his part and join Americas armed forces, but the military rejects him because of his small stature. Finally, Steve gets his chance when he is accepted into an experimental program that turns him into a supersoldier called Captain America. Joining forces with Bucky Barnes (Sebastian Stan) and Peggy Carter (Hayley Atwell), Captain America leads the fight against the Nazi-backed HYDRA organization.',
      image: 'captamerica.jpg',
      category: categories[0]._id, 
      price: 9.99,
      quantity: 10
    },
    {
      name: 'THE INCREDIBLE HULK (2008)',
      description:
        'Scientist Bruce Banner (Edward Norton) desperately seeks a cure for the gamma radiation that contaminated his cells and turned him into The Hulk. Cut off from his true love Betty Ross (Liv Tyler) and forced to hide from his nemesis, Gen. Thunderbolt Ross (William Hurt), Banner soon comes face-to-face with a new threat: a supremely powerful enemy known as The Abomination (Tim Roth).',
      image: 'hulk1.jpg',
      category: categories[0]._id,
      price: 9.99,
      quantity: 10
    },
    {
      name: 'IRON MAN (2008)',
      category: categories[0]._id,
      description:
        'A billionaire industrialist and genius inventor, Tony Stark (Robert Downey Jr.), is conducting weapons tests overseas, but terrorists kidnap him to force him to build a devastating weapon. Instead, he builds an armored suit and upends his captors. Returning to America, Stark refines the suit and uses it to combat crime and terrorism.',
      image: 'ironman1.jpg',
      price: 9.99,
      quantity: 10
    },
    {
      name: 'IRON MAN 2 (2010)',
      category: categories[0]._id,
      description:
        'With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and "Rhodey" Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.',
      image: 'ironman2.jpg',
      price: 9.99,
      quantity: 15
    },
    {
      name: 'STAR WARS: THE FORCE AWAKENS',
      category: categories[1]._id,
      description:
        'Thirty years after the defeat of the Galactic Empire, the galaxy faces a new threat from the evil Kylo Ren (Adam Driver) and the First Order. When a defector named Finn crash-lands on a desert planet, he meets Rey (Daisy Ridley), a tough scavenger whose droid contains a top-secret map. Together, the young duo joins forces with Han Solo (Harrison Ford) to make sure the Resistance receives the intelligence concerning the whereabouts of Luke Skywalker (Mark Hamill), the last of the Jedi Knights.',
      image: 'swforceawakens.jpg',
      price: 9.99,
      quantity: 15
    },
    {
      name: 'STAR WARS: EPISODE IV -- A NEW HOPE',
      category: categories[1]._id,
      description:
        'The Imperial Forces -- under orders from cruel Darth Vader (David Prowse) -- hold Princess Leia (Carrie Fisher) hostage, in their efforts to quell the rebellion against the Galactic Empire. Luke Skywalker (Mark Hamill) and Han Solo (Harrison Ford), captain of the Millennium Falcon, work together with the companionable droid duo R2-D2 (Kenny Baker) and C-3PO (Anthony Daniels) to rescue the beautiful princess, help the Rebel Alliance, and restore freedom and justice to the Galaxy.',
      image: 'starwarsiv.jpg',
      price: 9.99,
      quantity: 13
    },
    {
      name: 'Harry Potter and the Deathly Hallows: Part 2 (2011)',
      category: categories[2]._id,
      description:
        'Harry, Ron, and Hermione search for the remaining Horcruxes in their effort to destroy the Dark Lord as the final battle rages on at Hogwarts.',
      image: 'HPDH2.jpg',
      price: 9.99,
      quantity: 6
    },
    {
      name: 'Harry Potter and the Prisoner of Azkaban (2004)',
      category: categories[2]._id,
      description:
        'Harry Potter, Ron and Hermione return to Hogwarts School of Witchcraft and Wizardry for their third year of study, where they delve into the mystery surrounding an escaped prisoner who poses a dangerous threat to the young wizard.',
      image: 'HPPoA.jpg',
      price: 9.99,
      quantity: 5
    },
    {
      name: 'The Matrix (1999)',
      category: categories[3]._id,
      description:
      'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.',
      image: 'The_Matrix_digital_release_cover.jpg',
      price: 11.99,
      quantity: 15
    },
    {
      name: 'The Matrix Reloaded (2003)',
      category: categories[3]._id,
      description:
      'Freedom fighters Neo, Trinity and Morpheus continue to lead the revolt against the Machine Army, unleashing their arsenal of extraordinary skills and weaponry against the systematic forces of repression and exploitation.',
      image: 'The_Matrix_Reloaded_digital_release_cover.jpg',
      price: 11.99,
      quantity: 20
    },
    {
      name: 'The Matrix Revolutions (2003)',
      category: categories[3]._id,
      description:
      'The human city of Zion defends itself against the massive invasion of the machines as Neo fights to end the war at another front while also opposing the rogue Agent Smith.',
      image: 'The_Matrix_Revolutions_digital_release_cover.jpg',
      price: 11.99,
      quantity: 25
    }
    
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
