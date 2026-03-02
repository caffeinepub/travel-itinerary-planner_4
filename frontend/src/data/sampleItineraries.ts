// Country-specific sample itinerary templates
// Each template provides a realistic 7-day itinerary with activities

export interface SampleActivity {
  title: string;
  time: string;
  location: string;
  notes: string;
}

export interface SampleDay {
  activities: SampleActivity[];
}

export interface SampleItineraryTemplate {
  tripName: string;
  destination: string;
  description: string;
  days: SampleDay[];
}

function getStartDate(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function getEndDate(daysFromNow: number): Date {
  const d = getStartDate();
  d.setDate(d.getDate() + daysFromNow - 1);
  return d;
}

const templates: Record<string, SampleItineraryTemplate> = {
  France: {
    tripName: 'Enchanting France Adventure',
    destination: 'France',
    description:
      'A 7-day journey through the heart of France — from the iconic streets of Paris to the lavender fields of Provence. Savor world-class cuisine, art, and culture.',
    days: [
      {
        activities: [
          { title: 'Arrive at Charles de Gaulle Airport', time: '10:00 AM', location: 'CDG Airport, Paris', notes: 'Take the RER B train to central Paris. Journey takes about 35 minutes.' },
          { title: 'Check in & stroll the Marais district', time: '2:00 PM', location: 'Le Marais, Paris', notes: 'Explore the historic Jewish quarter, boutique shops, and art galleries.' },
          { title: 'Dinner at a classic Parisian bistro', time: '7:30 PM', location: 'Rue de Bretagne, Paris', notes: 'Try the steak frites and a glass of Bordeaux. Reservations recommended.' },
        ],
      },
      {
        activities: [
          { title: 'Eiffel Tower visit', time: '9:00 AM', location: 'Champ de Mars, Paris', notes: 'Book tickets online in advance to skip the queue. Go early for fewer crowds.' },
          { title: 'Lunch at Café de Flore', time: '12:30 PM', location: 'Saint-Germain-des-Prés, Paris', notes: 'Historic café frequented by Sartre and Simone de Beauvoir. Try the croque-monsieur.' },
          { title: 'Louvre Museum', time: '2:30 PM', location: 'Rue de Rivoli, Paris', notes: 'Focus on the Denon Wing for the Mona Lisa and Venus de Milo. Allow 3 hours minimum.' },
          { title: 'Seine River evening cruise', time: '8:00 PM', location: 'Pont de l\'Alma, Paris', notes: 'The city lights at night are magical. Bateaux Mouches offers 1-hour cruises.' },
        ],
      },
      {
        activities: [
          { title: 'Versailles Palace & Gardens', time: '9:00 AM', location: 'Palace of Versailles, Versailles', notes: 'Take the RER C from Paris. Arrive early — it gets very crowded by midday.' },
          { title: 'Picnic in the Palace Gardens', time: '1:00 PM', location: 'Gardens of Versailles', notes: 'Pick up supplies from a local boulangerie before heading out.' },
          { title: 'Return to Paris & Montmartre evening', time: '5:00 PM', location: 'Montmartre, Paris', notes: 'Watch the sunset from Sacré-Cœur and explore the artist quarter.' },
        ],
      },
      {
        activities: [
          { title: 'TGV train to Lyon', time: '8:30 AM', location: 'Gare de Lyon, Paris', notes: 'Journey takes about 2 hours. Lyon is the gastronomic capital of France.' },
          { title: 'Explore Vieux Lyon (Old Town)', time: '11:30 AM', location: 'Vieux Lyon, Lyon', notes: 'UNESCO World Heritage site with Renaissance architecture and hidden traboules (passageways).' },
          { title: 'Lunch at a traditional bouchon', time: '1:00 PM', location: 'Rue Mercière, Lyon', notes: 'Try quenelles de brochet and tarte aux pralines. Bouchons are Lyon\'s signature restaurants.' },
          { title: 'Fourvière Basilica & Roman Theatre', time: '3:30 PM', location: 'Fourvière Hill, Lyon', notes: 'Take the funicular up the hill. Stunning panoramic views of the city.' },
        ],
      },
      {
        activities: [
          { title: 'Drive to Provence', time: '9:00 AM', location: 'Lyon to Avignon', notes: 'Rent a car for the best experience. The drive takes about 2.5 hours via A7.' },
          { title: 'Palais des Papes, Avignon', time: '12:00 PM', location: 'Place du Palais, Avignon', notes: 'The largest Gothic palace in the world. Audio guide included with entry.' },
          { title: 'Lavender fields visit', time: '3:30 PM', location: 'Valensole Plateau, Provence', notes: 'Best visited June–July when lavender is in full bloom. Bring a camera!' },
          { title: 'Dinner in Aix-en-Provence', time: '7:30 PM', location: 'Cours Mirabeau, Aix-en-Provence', notes: 'Try the local specialty: calissons (almond sweets) and rosé wine from the region.' },
        ],
      },
      {
        activities: [
          { title: 'Morning market at Aix-en-Provence', time: '8:30 AM', location: 'Place Richelme, Aix-en-Provence', notes: 'One of the best markets in Provence. Fresh produce, flowers, and local crafts.' },
          { title: 'Gorges du Verdon scenic drive', time: '11:00 AM', location: 'Gorges du Verdon, Alpes-de-Haute-Provence', notes: 'Europe\'s Grand Canyon. Stop at Point Sublime for the best views.' },
          { title: 'Kayaking on Lac de Sainte-Croix', time: '2:00 PM', location: 'Lac de Sainte-Croix', notes: 'Rent kayaks at the lake entrance. The turquoise water is stunning.' },
        ],
      },
      {
        activities: [
          { title: 'Drive to Nice & Promenade des Anglais', time: '10:00 AM', location: 'Promenade des Anglais, Nice', notes: 'The iconic seafront boulevard. Perfect for a morning stroll.' },
          { title: 'Old Town Nice (Vieux-Nice)', time: '12:00 PM', location: 'Vieux-Nice, Nice', notes: 'Colorful baroque architecture and the famous Cours Saleya market.' },
          { title: 'Farewell dinner with Niçoise cuisine', time: '7:00 PM', location: 'Quai des États-Unis, Nice', notes: 'Try socca (chickpea pancake), salade niçoise, and pissaladière. Au revoir, France!' },
        ],
      },
    ],
  },

  Japan: {
    tripName: 'Timeless Japan Discovery',
    destination: 'Japan',
    description:
      'A 7-day immersion into Japan\'s extraordinary blend of ancient tradition and cutting-edge modernity — from Tokyo\'s neon-lit streets to Kyoto\'s serene temples.',
    days: [
      {
        activities: [
          { title: 'Arrive at Narita/Haneda Airport', time: '9:00 AM', location: 'Tokyo Airport', notes: 'Purchase a Suica card for easy transit. Take the Narita Express or Limousine Bus to your hotel.' },
          { title: 'Explore Shinjuku', time: '3:00 PM', location: 'Shinjuku, Tokyo', notes: 'Visit Shinjuku Gyoen garden, then explore the neon-lit Kabukicho entertainment district at night.' },
          { title: 'Ramen dinner', time: '7:00 PM', location: 'Shinjuku Ramen Street, Tokyo', notes: 'Try tonkotsu or shoyu ramen. Many shops have vending machine ordering — just point and pay.' },
        ],
      },
      {
        activities: [
          { title: 'Senso-ji Temple, Asakusa', time: '8:00 AM', location: 'Asakusa, Tokyo', notes: 'Tokyo\'s oldest temple. Go early to avoid crowds. Buy omamori (lucky charms) as souvenirs.' },
          { title: 'Akihabara Electric Town', time: '11:00 AM', location: 'Akihabara, Tokyo', notes: 'Electronics, anime, manga, and gaming culture. Multi-floor arcades are a must-visit.' },
          { title: 'Shibuya Crossing & Harajuku', time: '3:00 PM', location: 'Shibuya, Tokyo', notes: 'Watch the famous scramble crossing from the Starbucks above. Then walk to Takeshita Street in Harajuku.' },
          { title: 'Izakaya dinner', time: '7:30 PM', location: 'Shibuya, Tokyo', notes: 'Order yakitori, edamame, and cold Sapporo beer. Say "kanpai!" for cheers.' },
        ],
      },
      {
        activities: [
          { title: 'Day trip to Nikko', time: '8:00 AM', location: 'Nikko, Tochigi', notes: 'Take the Tobu Nikko Line from Asakusa (2 hours). The ornate Tosho-gu shrine is breathtaking.' },
          { title: 'Tosho-gu Shrine complex', time: '11:00 AM', location: 'Tosho-gu, Nikko', notes: 'See the famous "hear no evil, see no evil, speak no evil" monkeys carving.' },
          { title: 'Kegon Falls', time: '2:30 PM', location: 'Kegon Falls, Nikko', notes: 'One of Japan\'s most beautiful waterfalls. Take the elevator down for the best view.' },
        ],
      },
      {
        activities: [
          { title: 'Shinkansen to Kyoto', time: '8:30 AM', location: 'Tokyo Station', notes: 'The Nozomi bullet train takes about 2h15m. Book seats in advance for window views of Mt. Fuji.' },
          { title: 'Fushimi Inari Shrine', time: '1:00 PM', location: 'Fushimi, Kyoto', notes: 'Walk through thousands of vermillion torii gates. The full hike takes 2-3 hours.' },
          { title: 'Gion district evening walk', time: '6:00 PM', location: 'Gion, Kyoto', notes: 'Kyoto\'s geisha district. You may spot a maiko (apprentice geisha) heading to an appointment.' },
        ],
      },
      {
        activities: [
          { title: 'Arashiyama Bamboo Grove', time: '7:30 AM', location: 'Arashiyama, Kyoto', notes: 'Go at dawn for a magical, crowd-free experience. The rustling bamboo is otherworldly.' },
          { title: 'Tenryu-ji Temple & Garden', time: '9:30 AM', location: 'Arashiyama, Kyoto', notes: 'UNESCO World Heritage garden with a stunning pond and borrowed scenery of the mountains.' },
          { title: 'Nishiki Market', time: '1:00 PM', location: 'Nishiki Market, Kyoto', notes: 'Kyoto\'s "Kitchen" — 400-year-old covered market with pickles, tofu, and street food.' },
          { title: 'Kinkaku-ji (Golden Pavilion)', time: '3:30 PM', location: 'Kinkaku-ji, Kyoto', notes: 'The iconic gold-leaf covered temple reflected in the mirror pond. Arrive before 4pm.' },
        ],
      },
      {
        activities: [
          { title: 'Nara day trip — Deer Park', time: '9:00 AM', location: 'Nara Park, Nara', notes: 'Free-roaming deer bow for shika senbei (deer crackers). Buy from vendors near the park entrance.' },
          { title: 'Todai-ji Temple', time: '11:00 AM', location: 'Todai-ji, Nara', notes: 'Houses Japan\'s largest bronze Buddha statue. The Great South Gate is equally impressive.' },
          { title: 'Osaka street food evening', time: '5:00 PM', location: 'Dotonbori, Osaka', notes: 'Try takoyaki (octopus balls), okonomiyaki, and kushikatsu. Osaka is Japan\'s food capital.' },
        ],
      },
      {
        activities: [
          { title: 'Osaka Castle', time: '9:00 AM', location: 'Osaka Castle Park, Osaka', notes: 'Climb to the 8th floor for panoramic city views. The surrounding park is beautiful.' },
          { title: 'Kuromon Ichiba Market', time: '11:30 AM', location: 'Kuromon Market, Osaka', notes: 'Fresh seafood, wagyu beef, and local produce. Many stalls offer ready-to-eat items.' },
          { title: 'Farewell dinner — Kaiseki cuisine', time: '7:00 PM', location: 'Namba, Osaka', notes: 'Splurge on a traditional multi-course kaiseki meal for a perfect farewell to Japan.' },
        ],
      },
    ],
  },

  Italy: {
    tripName: 'La Dolce Vita — Italy',
    destination: 'Italy',
    description:
      'Seven days of art, history, and incredible food across Italy\'s most beloved cities — Rome, Florence, and Venice. Prepare to fall in love.',
    days: [
      {
        activities: [
          { title: 'Arrive in Rome', time: '11:00 AM', location: 'Fiumicino Airport, Rome', notes: 'Take the Leonardo Express train to Roma Termini (30 min). Validate your ticket before boarding.' },
          { title: 'Trastevere neighborhood walk', time: '3:00 PM', location: 'Trastevere, Rome', notes: 'Charming cobblestone streets, ivy-covered buildings, and authentic Roman atmosphere.' },
          { title: 'Dinner at a trattoria', time: '7:30 PM', location: 'Trastevere, Rome', notes: 'Try cacio e pepe, carbonara, or supplì (fried rice balls). Avoid tourist traps near major sights.' },
        ],
      },
      {
        activities: [
          { title: 'Colosseum & Roman Forum', time: '8:30 AM', location: 'Colosseum, Rome', notes: 'Book skip-the-line tickets online. Combined ticket includes the Forum and Palatine Hill.' },
          { title: 'Lunch near Campo de\' Fiori', time: '1:00 PM', location: 'Campo de\' Fiori, Rome', notes: 'Morning market sells fresh produce. Afternoon it becomes a lively piazza with cafés.' },
          { title: 'Vatican Museums & Sistine Chapel', time: '3:00 PM', location: 'Vatican City', notes: 'Book in advance — queues can be 3+ hours without tickets. The Sistine Chapel is unmissable.' },
          { title: 'Gelato at Giolitti', time: '7:00 PM', location: 'Via degli Uffici del Vicario, Rome', notes: 'One of Rome\'s oldest gelaterie. Try pistachio and stracciatella.' },
        ],
      },
      {
        activities: [
          { title: 'Trevi Fountain at dawn', time: '6:30 AM', location: 'Trevi Fountain, Rome', notes: 'Visit early to avoid the crowds. Toss a coin to ensure your return to Rome!' },
          { title: 'Borghese Gallery', time: '9:00 AM', location: 'Villa Borghese, Rome', notes: 'Bernini\'s sculptures are jaw-dropping. Timed entry required — book weeks in advance.' },
          { title: 'Pantheon', time: '2:00 PM', location: 'Piazza della Rotonda, Rome', notes: 'Nearly 2,000 years old and still the world\'s best-preserved ancient building. Entry fee applies.' },
          { title: 'Aperitivo hour', time: '6:30 PM', location: 'Prati district, Rome', notes: 'Order a Negroni or Aperol Spritz with complimentary snacks. A beloved Italian tradition.' },
        ],
      },
      {
        activities: [
          { title: 'High-speed train to Florence', time: '9:00 AM', location: 'Roma Termini', notes: 'Frecciarossa takes 1.5 hours. Florence\'s Santa Maria Novella station is central.' },
          { title: 'Uffizi Gallery', time: '12:00 PM', location: 'Piazzale degli Uffizi, Florence', notes: 'Home to Botticelli\'s Birth of Venus and Primavera. Book tickets well in advance.' },
          { title: 'Ponte Vecchio & Oltrarno', time: '4:00 PM', location: 'Ponte Vecchio, Florence', notes: 'The medieval bridge lined with jewelers. Cross to the Oltrarno for artisan workshops.' },
          { title: 'Bistecca Fiorentina dinner', time: '7:30 PM', location: 'Oltrarno, Florence', notes: 'Florence\'s famous T-bone steak, served rare. Pair with Chianti Classico wine.' },
        ],
      },
      {
        activities: [
          { title: 'Accademia Gallery — Michelangelo\'s David', time: '9:00 AM', location: 'Via Ricasoli, Florence', notes: 'The 17-foot marble masterpiece is even more impressive in person. Book tickets ahead.' },
          { title: 'Mercato Centrale', time: '11:30 AM', location: 'Mercato Centrale, Florence', notes: 'Ground floor: fresh produce market. Upper floor: food hall with Florentine specialties.' },
          { title: 'Piazzale Michelangelo sunset', time: '6:00 PM', location: 'Piazzale Michelangelo, Florence', notes: 'The best panoramic view of Florence. Bring a bottle of Prosecco for a perfect sunset toast.' },
        ],
      },
      {
        activities: [
          { title: 'Train to Venice', time: '9:30 AM', location: 'Santa Maria Novella, Florence', notes: 'Journey takes about 2 hours. Venice Santa Lucia station opens directly onto the Grand Canal.' },
          { title: 'Grand Canal vaporetto ride', time: '12:30 PM', location: 'Grand Canal, Venice', notes: 'Take vaporetto line 1 for the full scenic route. Sit at the front for the best views.' },
          { title: 'St. Mark\'s Basilica & Doge\'s Palace', time: '2:30 PM', location: 'Piazza San Marco, Venice', notes: 'Book Doge\'s Palace tickets online. The Bridge of Sighs is visible from the Ponte della Paglia.' },
          { title: 'Cicchetti bar hop in Cannaregio', time: '6:30 PM', location: 'Cannaregio, Venice', notes: 'Venice\'s answer to tapas. Order small bites (cicchetti) and ombra (small glass of wine) at bacari bars.' },
        ],
      },
      {
        activities: [
          { title: 'Murano Island glass-blowing', time: '9:00 AM', location: 'Murano Island, Venice', notes: 'Take vaporetto line 4.1 from Fondamente Nove. Watch master glassblowers at work for free.' },
          { title: 'Burano Island — colorful houses', time: '12:00 PM', location: 'Burano Island, Venice', notes: 'The most photogenic island in the lagoon. Famous for lace-making and brightly painted houses.' },
          { title: 'Farewell Venetian dinner', time: '7:00 PM', location: 'Dorsoduro, Venice', notes: 'Try sarde in saor (sweet-sour sardines) and risotto al nero di seppia (squid ink risotto). Arrivederci!' },
        ],
      },
    ],
  },

  'United States': {
    tripName: 'American Icons Road Trip',
    destination: 'United States',
    description:
      'A 7-day adventure through America\'s most iconic destinations — New York City\'s skyline, the Grand Canyon\'s majesty, and the magic of San Francisco.',
    days: [
      {
        activities: [
          { title: 'Arrive in New York City', time: '10:00 AM', location: 'JFK Airport, New York', notes: 'Take the AirTrain + subway (E train) to Manhattan. About 60 minutes and much cheaper than a taxi.' },
          { title: 'Times Square & Broadway district', time: '3:00 PM', location: 'Times Square, Manhattan', notes: 'The neon spectacle is best at dusk. Book a Broadway show for the evening if interested.' },
          { title: 'New York pizza dinner', time: '7:00 PM', location: 'Hell\'s Kitchen, Manhattan', notes: 'Grab a classic NY slice — fold it in half and eat it walking. Joe\'s Pizza is a legendary spot.' },
        ],
      },
      {
        activities: [
          { title: 'Central Park morning walk', time: '8:00 AM', location: 'Central Park, Manhattan', notes: 'Rent a bike or walk the 6-mile loop. Visit Bethesda Fountain and Strawberry Fields.' },
          { title: 'Metropolitan Museum of Art', time: '11:00 AM', location: '5th Avenue, Manhattan', notes: 'One of the world\'s greatest museums. The Egyptian Temple of Dendur and European paintings are highlights.' },
          { title: 'High Line & Chelsea Market', time: '3:00 PM', location: 'High Line, Manhattan', notes: 'Elevated park on a former railway. Chelsea Market below has excellent food vendors.' },
          { title: 'Brooklyn Bridge walk at sunset', time: '6:30 PM', location: 'Brooklyn Bridge, New York', notes: 'Walk from Manhattan to Brooklyn for stunning skyline views. DUMBO neighborhood is great for dinner.' },
        ],
      },
      {
        activities: [
          { title: 'Statue of Liberty & Ellis Island', time: '9:00 AM', location: 'Battery Park, Manhattan', notes: 'Book ferry tickets in advance. Crown access requires booking months ahead.' },
          { title: 'Wall Street & 9/11 Memorial', time: '1:30 PM', location: 'Lower Manhattan', notes: 'The reflecting pools are deeply moving. The museum tells the full story of that day.' },
          { title: 'Flight to Las Vegas', time: '6:00 PM', location: 'JFK Airport, New York', notes: 'Many direct flights available. The Strip is best experienced at night.' },
        ],
      },
      {
        activities: [
          { title: 'Las Vegas Strip morning walk', time: '9:00 AM', location: 'Las Vegas Strip, Nevada', notes: 'The casinos are open 24/7. The Bellagio fountains run every 15-30 minutes.' },
          { title: 'Drive to Grand Canyon South Rim', time: '12:00 PM', location: 'Grand Canyon, Arizona', notes: '4.5-hour drive from Las Vegas. Arrive before sunset for the most dramatic light.' },
          { title: 'Grand Canyon sunset viewing', time: '6:00 PM', location: 'Mather Point, Grand Canyon', notes: 'One of the most awe-inspiring views on Earth. The canyon is 277 miles long and a mile deep.' },
        ],
      },
      {
        activities: [
          { title: 'Grand Canyon rim hike', time: '7:00 AM', location: 'Bright Angel Trail, Grand Canyon', notes: 'Hike down 1.5 miles to the first rest house. Bring plenty of water — it\'s much harder going up.' },
          { title: 'Drive to Sedona', time: '12:00 PM', location: 'Sedona, Arizona', notes: '2-hour drive through stunning red rock country. Stop at Oak Creek Canyon overlook.' },
          { title: 'Sedona vortex hike', time: '3:00 PM', location: 'Bell Rock, Sedona', notes: 'Sedona is famous for its energy vortexes. Bell Rock is the most accessible and photogenic.' },
        ],
      },
      {
        activities: [
          { title: 'Flight to San Francisco', time: '9:00 AM', location: 'Phoenix Sky Harbor Airport', notes: '1.5-hour flight. BART train from SFO to downtown takes 30 minutes.' },
          { title: 'Fisherman\'s Wharf & Pier 39', time: '1:00 PM', location: 'Fisherman\'s Wharf, San Francisco', notes: 'Watch the sea lions at Pier 39. Try clam chowder in a sourdough bread bowl.' },
          { title: 'Golden Gate Bridge at sunset', time: '5:30 PM', location: 'Golden Gate Bridge, San Francisco', notes: 'Walk or cycle across the bridge. Battery Spencer on the Marin side offers the best photo angle.' },
          { title: 'Dinner in the Mission District', time: '8:00 PM', location: 'Mission District, San Francisco', notes: 'SF\'s best burritos and vibrant Latino culture. Dolores Park is nearby for a post-dinner stroll.' },
        ],
      },
      {
        activities: [
          { title: 'Alcatraz Island tour', time: '9:00 AM', location: 'Alcatraz Island, San Francisco Bay', notes: 'Book ferry tickets weeks in advance — they sell out fast. The audio tour is excellent.' },
          { title: 'Chinatown & North Beach', time: '1:00 PM', location: 'Chinatown, San Francisco', notes: 'America\'s oldest Chinatown. Grab dim sum for lunch, then walk to North Beach for Italian coffee.' },
          { title: 'Farewell dinner at a SF institution', time: '7:00 PM', location: 'Union Square, San Francisco', notes: 'Try Dungeness crab or sourdough bread — both SF specialties. Cheers to an amazing trip!' },
        ],
      },
    ],
  },

  Thailand: {
    tripName: 'Thailand — Land of Smiles',
    destination: 'Thailand',
    description:
      'Seven days exploring Thailand\'s golden temples, vibrant street food scene, and pristine tropical islands. An unforgettable Southeast Asian adventure.',
    days: [
      {
        activities: [
          { title: 'Arrive at Suvarnabhumi Airport, Bangkok', time: '10:00 AM', location: 'Suvarnabhumi Airport, Bangkok', notes: 'Take the Airport Rail Link to Phaya Thai station (30 min, 45 baht). Much faster than a taxi.' },
          { title: 'Khao San Road & Banglamphu', time: '4:00 PM', location: 'Khao San Road, Bangkok', notes: 'The legendary backpacker street. Great for cheap street food, massages, and people-watching.' },
          { title: 'Pad Thai street food dinner', time: '7:00 PM', location: 'Khao San Road, Bangkok', notes: 'Try pad thai, mango sticky rice, and fresh coconut water. Prices are very affordable.' },
        ],
      },
      {
        activities: [
          { title: 'Grand Palace & Wat Phra Kaew', time: '8:00 AM', location: 'Grand Palace, Bangkok', notes: 'Dress modestly — shoulders and knees must be covered. Sarongs available to borrow at the entrance.' },
          { title: 'Wat Pho — Reclining Buddha', time: '11:30 AM', location: 'Wat Pho, Bangkok', notes: 'The 46-meter gold reclining Buddha is stunning. The temple also has Thailand\'s best traditional massage school.' },
          { title: 'Chao Phraya river boat', time: '2:00 PM', location: 'Chao Phraya River, Bangkok', notes: 'Take the orange-flag express boat to explore riverside temples and neighborhoods.' },
          { title: 'Rooftop bar at sunset', time: '6:00 PM', location: 'Silom, Bangkok', notes: 'Bangkok has incredible rooftop bars. Vertigo at Banyan Tree or Sky Bar at Lebua are iconic.' },
        ],
      },
      {
        activities: [
          { title: 'Chatuchak Weekend Market', time: '9:00 AM', location: 'Chatuchak, Bangkok', notes: 'One of the world\'s largest markets with 15,000 stalls. Go early before the heat. Bring cash.' },
          { title: 'Jim Thompson House', time: '1:00 PM', location: 'Wang Mai, Bangkok', notes: 'Beautiful Thai silk merchant\'s home turned museum. Guided tours available in English.' },
          { title: 'Thai cooking class', time: '4:00 PM', location: 'Silom Cooking School, Bangkok', notes: 'Learn to make tom yum, green curry, and mango sticky rice. Most classes include a market visit.' },
        ],
      },
      {
        activities: [
          { title: 'Flight to Chiang Mai', time: '8:00 AM', location: 'Don Mueang Airport, Bangkok', notes: '1-hour flight. Chiang Mai is the cultural capital of northern Thailand.' },
          { title: 'Old City temples walk', time: '12:00 PM', location: 'Old City, Chiang Mai', notes: 'The moat-surrounded old city has over 30 temples. Wat Chedi Luang and Wat Phra Singh are highlights.' },
          { title: 'Sunday Walking Street', time: '5:00 PM', location: 'Wualai Road, Chiang Mai', notes: 'Chiang Mai\'s famous night market with local crafts, street food, and live music.' },
        ],
      },
      {
        activities: [
          { title: 'Elephant sanctuary visit', time: '8:00 AM', location: 'Elephant Nature Park, Chiang Mai', notes: 'Choose an ethical sanctuary where elephants roam freely. Full-day programs include feeding and bathing.' },
          { title: 'Doi Suthep Temple', time: '4:00 PM', location: 'Doi Suthep, Chiang Mai', notes: 'Sacred mountain temple with 306 steps (or take the funicular). Panoramic views of Chiang Mai.' },
          { title: 'Khao Soi dinner', time: '7:00 PM', location: 'Nimman Road, Chiang Mai', notes: 'Northern Thailand\'s signature dish — coconut curry noodle soup. Khao Soi Khun Yai is legendary.' },
        ],
      },
      {
        activities: [
          { title: 'Flight to Koh Samui', time: '9:00 AM', location: 'Chiang Mai Airport', notes: 'Connect via Bangkok. Koh Samui is Thailand\'s second-largest island with stunning beaches.' },
          { title: 'Chaweng Beach afternoon', time: '3:00 PM', location: 'Chaweng Beach, Koh Samui', notes: 'The most popular beach on the island. Crystal clear water and white sand. Rent a scooter to explore.' },
          { title: 'Beachside seafood dinner', time: '7:00 PM', location: 'Chaweng Beach, Koh Samui', notes: 'Choose your fresh seafood from the display and have it grilled to order. Try the tiger prawns.' },
        ],
      },
      {
        activities: [
          { title: 'Ang Thong Marine Park snorkeling', time: '8:00 AM', location: 'Ang Thong National Marine Park', notes: 'Day trip by speedboat. Snorkel in crystal-clear waters and kayak through sea caves.' },
          { title: 'Big Buddha Temple', time: '4:00 PM', location: 'Big Buddha, Koh Samui', notes: '12-meter golden Buddha statue on a small island connected by a causeway. Dress modestly.' },
          { title: 'Farewell Thai feast', time: '7:30 PM', location: 'Fisherman\'s Village, Koh Samui', notes: 'Bophut\'s charming village has excellent restaurants. Try massaman curry and fresh coconut ice cream. Khob khun kha!' },
        ],
      },
    ],
  },

  Spain: {
    tripName: 'Viva España — Spanish Highlights',
    destination: 'Spain',
    description:
      'Seven days of flamenco, tapas, and architectural wonders across Spain\'s most vibrant cities — Barcelona, Madrid, and Seville.',
    days: [
      {
        activities: [
          { title: 'Arrive in Barcelona', time: '11:00 AM', location: 'El Prat Airport, Barcelona', notes: 'Take the Aerobus to Plaça de Catalunya (35 min). The city center is very walkable.' },
          { title: 'La Barceloneta Beach', time: '3:00 PM', location: 'Barceloneta, Barcelona', notes: 'Relax on the city beach. The Mediterranean is warm from June to October.' },
          { title: 'Tapas bar crawl in El Born', time: '8:00 PM', location: 'El Born, Barcelona', notes: 'Order patatas bravas, pan con tomate, and jamón ibérico. Dinner starts late in Spain — 9pm is normal.' },
        ],
      },
      {
        activities: [
          { title: 'Sagrada Família', time: '9:00 AM', location: 'Sagrada Família, Barcelona', notes: 'Gaudí\'s unfinished masterpiece. Book tickets online — it sells out weeks in advance. Tower access is worth it.' },
          { title: 'Park Güell', time: '12:30 PM', location: 'Park Güell, Barcelona', notes: 'Gaudí\'s colorful mosaic park. The monumental zone requires timed tickets. Views of the city are spectacular.' },
          { title: 'Las Ramblas & La Boqueria Market', time: '3:00 PM', location: 'Las Ramblas, Barcelona', notes: 'Walk the famous boulevard. La Boqueria market has fresh fruit, seafood, and jamón. Watch for pickpockets.' },
          { title: 'Flamenco show', time: '9:00 PM', location: 'El Tablao de Carmen, Barcelona', notes: 'Authentic flamenco performance in the Poble Espanyol. Book in advance for the best seats.' },
        ],
      },
      {
        activities: [
          { title: 'Gothic Quarter morning walk', time: '9:00 AM', location: 'Barri Gòtic, Barcelona', notes: 'Medieval streets with Roman ruins beneath. Visit the Barcelona Cathedral and Plaça Reial.' },
          { title: 'Picasso Museum', time: '11:30 AM', location: 'El Born, Barcelona', notes: 'Traces Picasso\'s early years in Barcelona. The medieval palaces housing the collection are stunning.' },
          { title: 'AVE high-speed train to Madrid', time: '4:00 PM', location: 'Barcelona Sants Station', notes: 'Journey takes 2.5 hours. Madrid\'s Atocha station has a beautiful tropical garden inside.' },
        ],
      },
      {
        activities: [
          { title: 'Prado Museum', time: '10:00 AM', location: 'Paseo del Prado, Madrid', notes: 'One of the world\'s finest art museums. Velázquez\'s Las Meninas and Goya\'s Black Paintings are unmissable.' },
          { title: 'Retiro Park', time: '1:30 PM', location: 'Parque del Retiro, Madrid', notes: 'Rent a rowboat on the lake or stroll through the rose garden. The Crystal Palace is beautiful.' },
          { title: 'Mercado de San Miguel', time: '4:00 PM', location: 'Plaza Mayor, Madrid', notes: 'Elegant iron-and-glass market with gourmet tapas, wine, and vermouth. Perfect for an afternoon snack.' },
          { title: 'Churros con chocolate', time: '10:00 PM', location: 'Chocolatería San Ginés, Madrid', notes: 'Madrid\'s most famous churros spot, open since 1894. The thick hot chocolate is legendary.' },
        ],
      },
      {
        activities: [
          { title: 'Royal Palace of Madrid', time: '9:30 AM', location: 'Calle de Bailén, Madrid', notes: 'The official residence of the Spanish Royal Family. 3,418 rooms — the largest royal palace in Europe.' },
          { title: 'El Rastro flea market', time: '11:30 AM', location: 'La Latina, Madrid', notes: 'Open Sundays only. Hundreds of stalls selling antiques, vintage clothing, and curiosities.' },
          { title: 'AVE train to Seville', time: '3:00 PM', location: 'Madrid Atocha Station', notes: '2.5-hour journey. Seville is the capital of Andalusia and birthplace of flamenco.' },
        ],
      },
      {
        activities: [
          { title: 'Real Alcázar of Seville', time: '9:00 AM', location: 'Patio de Banderas, Seville', notes: 'A UNESCO World Heritage royal palace with stunning Moorish architecture. Book tickets in advance.' },
          { title: 'Seville Cathedral & La Giralda', time: '11:30 AM', location: 'Avenida de la Constitución, Seville', notes: 'The world\'s largest Gothic cathedral. Climb La Giralda tower for panoramic views.' },
          { title: 'Barrio Santa Cruz', time: '2:30 PM', location: 'Santa Cruz, Seville', notes: 'The old Jewish quarter with whitewashed houses, orange trees, and hidden plazas.' },
          { title: 'Flamenco show in Triana', time: '9:00 PM', location: 'Triana, Seville', notes: 'Triana is the birthplace of flamenco. A show here feels more authentic than tourist venues.' },
        ],
      },
      {
        activities: [
          { title: 'Plaza de España morning', time: '8:30 AM', location: 'Plaza de España, Seville', notes: 'One of Spain\'s most beautiful squares. Rent a rowboat on the canal or admire the tiled alcoves.' },
          { title: 'Metropol Parasol (Las Setas)', time: '11:00 AM', location: 'Plaza de la Encarnación, Seville', notes: 'The world\'s largest wooden structure. The rooftop walkway offers great city views.' },
          { title: 'Farewell tapas & sherry', time: '7:30 PM', location: 'El Arenal, Seville', notes: 'End your Spanish adventure with fino sherry and jamón ibérico. ¡Hasta luego, España!' },
        ],
      },
    ],
  },
};

// Generic fallback template for countries without a specific template
function createGenericTemplate(country: string): SampleItineraryTemplate {
  return {
    tripName: `Exploring ${country}`,
    destination: country,
    description: `A 7-day adventure through the highlights of ${country}. Discover local culture, cuisine, and unforgettable landscapes.`,
    days: [
      {
        activities: [
          { title: `Arrive in ${country}`, time: '10:00 AM', location: `Main Airport, ${country}`, notes: 'Get settled and orient yourself. Pick up a local SIM card and some local currency.' },
          { title: 'Explore the city center', time: '3:00 PM', location: `City Center, ${country}`, notes: 'Walk around the main square and get a feel for the local atmosphere.' },
          { title: 'Welcome dinner', time: '7:30 PM', location: `Local Restaurant, ${country}`, notes: 'Try the local specialty dishes and a traditional drink.' },
        ],
      },
      {
        activities: [
          { title: 'Visit the main historical site', time: '9:00 AM', location: `Historic District, ${country}`, notes: 'The most important cultural or historical landmark in the country.' },
          { title: 'Local market visit', time: '12:00 PM', location: `Central Market, ${country}`, notes: 'Browse local produce, crafts, and street food.' },
          { title: 'Museum or gallery', time: '3:00 PM', location: `National Museum, ${country}`, notes: 'Learn about the country\'s history and culture.' },
        ],
      },
      {
        activities: [
          { title: 'Day trip to natural attraction', time: '8:00 AM', location: `Natural Park, ${country}`, notes: 'Explore the natural beauty of the region. Bring comfortable shoes and water.' },
          { title: 'Scenic viewpoint', time: '1:00 PM', location: `Scenic Overlook, ${country}`, notes: 'Panoramic views of the landscape. Perfect for photography.' },
          { title: 'Local cuisine cooking class', time: '5:00 PM', location: `Cooking School, ${country}`, notes: 'Learn to prepare traditional dishes to recreate at home.' },
        ],
      },
      {
        activities: [
          { title: 'Religious or cultural site', time: '9:00 AM', location: `Sacred Site, ${country}`, notes: 'Dress respectfully and follow local customs.' },
          { title: 'Artisan workshop visit', time: '12:00 PM', location: `Craft District, ${country}`, notes: 'Watch local artisans at work and pick up unique souvenirs.' },
          { title: 'Sunset at a scenic spot', time: '6:00 PM', location: `Viewpoint, ${country}`, notes: 'The best place to watch the sunset in the region.' },
        ],
      },
      {
        activities: [
          { title: 'Outdoor adventure activity', time: '8:00 AM', location: `Adventure Park, ${country}`, notes: 'Hiking, cycling, or water sports depending on the region.' },
          { title: 'Lunch at a local favorite', time: '1:00 PM', location: `Local Eatery, ${country}`, notes: 'Ask your hotel for recommendations — locals always know the best spots.' },
          { title: 'Evening cultural performance', time: '7:00 PM', location: `Cultural Center, ${country}`, notes: 'Traditional music, dance, or theater performance.' },
        ],
      },
      {
        activities: [
          { title: 'Explore a nearby town or village', time: '9:00 AM', location: `Nearby Village, ${country}`, notes: 'A short drive or train ride to experience rural life and local traditions.' },
          { title: 'Picnic in nature', time: '1:00 PM', location: `Countryside, ${country}`, notes: 'Pick up supplies from a local market and enjoy a relaxed outdoor lunch.' },
          { title: 'Farewell dinner', time: '7:30 PM', location: `Fine Dining, ${country}`, notes: 'Splurge on a special meal to celebrate your last full day.' },
        ],
      },
      {
        activities: [
          { title: 'Morning souvenir shopping', time: '9:00 AM', location: `Shopping District, ${country}`, notes: 'Last chance to pick up gifts and mementos for friends and family.' },
          { title: 'Final sightseeing', time: '11:00 AM', location: `City Center, ${country}`, notes: 'Revisit your favorite spots or discover something new.' },
          { title: 'Depart for airport', time: '3:00 PM', location: `Airport, ${country}`, notes: 'Allow plenty of time for check-in and security. Safe travels!' },
        ],
      },
    ],
  };
}

export function getSampleItinerary(country: string): SampleItineraryTemplate & { startDate: Date; endDate: Date } {
  const template = templates[country] ?? createGenericTemplate(country);
  const startDate = getStartDate();
  const endDate = getEndDate(template.days.length);
  return { ...template, startDate, endDate };
}
