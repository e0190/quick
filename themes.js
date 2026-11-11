// Each entry: "Display|alias|alias". Teams: "City|Nickname" builds both forms.
const team = (list) => list.map(s => { const [c, n] = s.split('|'); return `${c} ${n}|${n}`; });
const THEMES = {
  nba: { name: 'NBA Teams', hint: '30 teams', items: team([
    'Atlanta|Hawks','Boston|Celtics','Brooklyn|Nets','Charlotte|Hornets','Chicago|Bulls','Cleveland|Cavaliers','Dallas|Mavericks','Denver|Nuggets','Detroit|Pistons','Golden State|Warriors','Houston|Rockets','Indiana|Pacers','Los Angeles|Clippers','Los Angeles|Lakers','Memphis|Grizzlies','Miami|Heat','Milwaukee|Bucks','Minnesota|Timberwolves','New Orleans|Pelicans','New York|Knicks','Oklahoma City|Thunder','Orlando|Magic','Philadelphia|76ers','Phoenix|Suns','Portland|Trail Blazers','Sacramento|Kings','San Antonio|Spurs','Toronto|Raptors','Utah|Jazz','Washington|Wizards'
  ]).map(s => s.replace('Cavaliers','Cavaliers|Cavs').replace('Mavericks','Mavericks|Mavs').replace('76ers','76ers|Sixers').replace('Timberwolves','Timberwolves|Wolves').replace('Trail Blazers','Trail Blazers|Blazers').replace('Los Angeles Lakers','Los Angeles Lakers|LA Lakers').replace('Los Angeles Clippers','Los Angeles Clippers|LA Clippers')) },
  nfl: { name: 'NFL Teams', hint: '32 teams', items: team([
    'Arizona|Cardinals','Atlanta|Falcons','Baltimore|Ravens','Buffalo|Bills','Carolina|Panthers','Chicago|Bears','Cincinnati|Bengals','Cleveland|Browns','Dallas|Cowboys','Denver|Broncos','Detroit|Lions','Green Bay|Packers','Houston|Texans','Indianapolis|Colts','Jacksonville|Jaguars','Kansas City|Chiefs','Las Vegas|Raiders','Los Angeles|Chargers','Los Angeles|Rams','Miami|Dolphins','Minnesota|Vikings','New England|Patriots','New Orleans|Saints','New York|Giants','New York|Jets','Philadelphia|Eagles','Pittsburgh|Steelers','San Francisco|49ers','Seattle|Seahawks','Tampa Bay|Buccaneers','Tennessee|Titans','Washington|Commanders'
  ]).map(s => s.replace('Buccaneers','Buccaneers|Bucs').replace('49ers','49ers|Niners').replace('Jaguars','Jaguars|Jags').replace('Patriots','Patriots|Pats')) },
  mlb: { name: 'MLB Teams', hint: '30 teams', items: team([
    'Arizona|Diamondbacks','Atlanta|Braves','Baltimore|Orioles','Boston|Red Sox','Chicago|Cubs','Chicago|White Sox','Cincinnati|Reds','Cleveland|Guardians','Colorado|Rockies','Detroit|Tigers','Houston|Astros','Kansas City|Royals','Los Angeles|Angels','Los Angeles|Dodgers','Miami|Marlins','Milwaukee|Brewers','Minnesota|Twins','New York|Mets','New York|Yankees','Athletics|Athletics','Philadelphia|Phillies','Pittsburgh|Pirates','San Diego|Padres','San Francisco|Giants','Seattle|Mariners','St. Louis|Cardinals','Tampa Bay|Rays','Texas|Rangers','Toronto|Blue Jays','Washington|Nationals'
  ]).map(s => s.replace('Athletics Athletics|Athletics','Athletics|As|Oakland Athletics').replace('Diamondbacks','Diamondbacks|Dbacks')) },
  disney: { name: 'Disney Characters', hint: 'animated classics', items: [
    'Mickey Mouse|Mickey','Minnie Mouse|Minnie','Donald Duck|Donald','Daisy Duck|Daisy','Goofy','Pluto','Chip','Dale','Simba','Nala','Mufasa','Scar','Timon','Pumbaa','Rafiki','Zazu','Ariel','Sebastian','Flounder','Ursula','Prince Eric|Eric','King Triton|Triton','Belle','Beast','Gaston','Lumiere','Cogsworth','Mrs. Potts','Chip Potts','Aladdin','Jasmine','Genie','Jafar','Abu','Iago','Rajah','Cinderella','Prince Charming','Snow White','Aurora|Sleeping Beauty','Maleficent','Mulan','Mushu','Pocahontas','Meeko','Hercules','Megara|Meg','Hades','Phil|Philoctetes','Pegasus','Quasimodo','Esmeralda','Frollo','Tarzan','Jane','Rapunzel','Flynn Rider|Eugene','Mother Gothel','Pascal','Maximus','Tiana','Prince Naveen|Naveen','Merida','Elsa','Anna','Olaf','Kristoff','Sven','Hans','Moana','Maui','Heihei','Pua','Mirabel','Bruno','Isabela','Luisa','Raya','Sisu','Asha','Peter Pan','Tinker Bell','Wendy','Captain Hook|Hook','Alice','Cheshire Cat','Mad Hatter','Queen of Hearts','White Rabbit','Pinocchio','Jiminy Cricket','Geppetto','Dumbo','Bambi','Thumper','Flower','Lady','Tramp','Cruella de Vil|Cruella','Pongo','Perdita','Mowgli','Baloo','Bagheera','Shere Khan','Kaa','King Louie','Winnie the Pooh|Pooh','Tigger','Piglet','Eeyore','Christopher Robin','Stitch','Lilo','Nani','Ratatouille|Remy','Woody','Buzz Lightyear|Buzz','Jessie','Rex','Hamm','Slinky','Mr. Potato Head','Bo Peep','Lotso','Forky','Nemo','Dory','Marlin','Lightning McQueen','Mater','Sully','Mike Wazowski|Mike','Boo','Wall-E|Walle','Eve','Carl Fredricksen|Carl','Russell','Dug','Joy','Sadness','Anger','Fear','Disgust','Anxiety','Mr. Incredible','Elastigirl','Violet','Dash','Jack-Jack','Frozone','Edna Mode|Edna','Syndrome','Judy Hopps|Judy','Nick Wilde|Nick','Flash','Baymax','Hiro','Wreck-It Ralph|Ralph','Vanellope','Kuzco','Kronk','Yzma','Pacha','Stitch','Kida','Milo','Robin Hood','Prince John','Little John','Oliver','Dodger','Basil','Ratigan','Taran','Kenai','Koda','Sid','Ray','Louis','Dr. Facilier|Facilier','Hei Hei','Tamatoa','Te Fiti','Abuela','Antonio','Dolores','Pepa','Camilo','Scuttle','Max','Grumpy','Dopey','Doc','Happy','Sleepy','Bashful','Sneezy','Fairy Godmother','Lady Tremaine','Anastasia','Drizella','Gus','Jaq','Lucifer','Flora','Fauna','Merryweather','Prince Phillip|Phillip','Shan Yu','Li Shang|Shang','Ray McQueen','Mama Odie','Meeko','Flit','Governor Ratcliffe|Ratcliffe','John Smith','Clayton','Terk','Kerchak','Kala','Pain','Panic','Sunny','Anton Ego','Linguini','Colette','Merlin','Arthur','Madam Mim','Archimedes'
  ]},
  marvel: { name: 'Marvel Heroes', hint: '127 heroes', items: ["Spider-Man|Spiderman|Peter Parker","Iron Man|Tony Stark","Captain America|Cap|Steve Rogers","Thor|Thor Odinson","Hulk|The Hulk|Bruce Banner|Incredible Hulk","Black Widow|Natasha Romanoff|Natasha Romanova","Hawkeye|Clint Barton","Black Panther|T'Challa|TChalla","Doctor Strange|Dr. Strange|Stephen Strange","Captain Marvel|Carol Danvers","Ant-Man|Antman|Scott Lang|Hank Pym","Wasp|The Wasp|Janet van Dyne|Hope van Dyne","Scarlet Witch|Wanda Maximoff","Vision|The Vision","Falcon|Sam Wilson","Winter Soldier|Bucky Barnes|Bucky","War Machine|James Rhodes|Rhodey","Wolverine|Logan|James Howlett","Cyclops|Scott Summers","Storm|Ororo Munroe","Jean Grey|Phoenix|Marvel Girl","Professor X|Charles Xavier|Professor Xavier","Beast|Hank McCoy","Iceman|Bobby Drake","Rogue|Anna Marie","Gambit|Remy LeBeau","Nightcrawler|Kurt Wagner","Colossus|Piotr Rasputin","Kitty Pryde|Shadowcat|Kitty","Jubilee|Jubilation Lee","Psylocke|Betsy Braddock","Angel|Archangel|Warren Worthington","Havok|Alex Summers","Cable|Nathan Summers","Bishop|Lucas Bishop","Deadpool|Wade Wilson","Daredevil|Matt Murdock","Luke Cage|Power Man","Iron Fist|Danny Rand","Jessica Jones|Jewel","Punisher|The Punisher|Frank Castle","Moon Knight|Marc Spector","Blade|Eric Brooks","Ghost Rider|Johnny Blaze|Robbie Reyes","Silver Surfer|Norrin Radd","Mister Fantastic|Mr. Fantastic|Reed Richards","Invisible Woman|Sue Storm|Invisible Girl","Human Torch|Johnny Storm","The Thing|Thing|Ben Grimm","Star-Lord|Starlord|Peter Quill","Gamora","Drax|Drax the Destroyer","Rocket|Rocket Raccoon","Groot","Mantis","Nebula","Shang-Chi","Ms. Marvel|Miss Marvel|Kamala Khan","She-Hulk|Shehulk|Jennifer Walters","Miles Morales|Spider-Man Miles","Spider-Woman|Jessica Drew","Spider-Gwen|Ghost-Spider|Gwen Stacy","Squirrel Girl|Doreen Green","Nova|Richard Rider|Sam Alexander","Quicksilver|Pietro Maximoff","Black Bolt|Blackagar Boltagon","Medusa","Namor|Namor the Sub-Mariner|Sub-Mariner","Silk|Cindy Moon","Echo|Maya Lopez","Kate Bishop","Yelena Belova","America Chavez|Miss America","Hercules","Sentry|Robert Reynolds","Cloak","Dagger","Elektra|Elektra Natchios","Valkyrie|Brunnhilde","Wonder Man|Simon Williams","Captain Britain|Brian Braddock","Northstar","Dazzler|Alison Blaire","Firestar|Angelica Jones","Hellcat|Patsy Walker","Power Princess","U.S. Agent|US Agent|John Walker","Adam Warlock","Quasar|Wendell Vaughn","Multiple Man|Jamie Madrox","Domino","Forge","Banshee|Sean Cassidy","Polaris|Lorna Dane","Magik|Illyana Rasputina","Cannonball|Sam Guthrie","Sunspot|Roberto da Costa","Wolfsbane|Rahne Sinclair","X-23|Laura Kinney|Wolverine Laura","Thor Jane Foster|Jane Foster|Mighty Thor","Moondragon","Werewolf by Night|Jack Russell","Man-Thing","Morbius","Venom|Eddie Brock","Agent Venom|Flash Thompson","Ironheart|Riri Williams","Hulkling|Teddy Altman","Wiccan|Billy Kaplan","Speed|Tommy Shepherd","Mockingbird|Bobbi Morse","Black Knight|Dane Whitman","Tigra","Captain Mar-Vell|Mar-Vell","Moon Girl|Lunella Lafayette","Devil Dinosaur","Beta Ray Bill","Sif|Lady Sif","Korg","Okoye","Shuri","White Tiger","Sharon Carter|Agent 13","Nick Fury","Maria Hill","Phil Coulson|Coulson","Quake|Daisy Johnson"] },
  restaurants: { name: 'Restaurants', hint: '139 chains', items: ["McDonald's|McDonalds|Mickey D's","Burger King|BK","Wendy's|Wendys","Taco Bell","KFC|Kentucky Fried Chicken","Subway","Chick-fil-A|Chickfila|Chick fil a","Popeyes|Popeye's","Arby's|Arbys","Sonic|Sonic Drive-In","Jack in the Box","Carl's Jr.|Carls Jr","Hardee's|Hardees","White Castle","In-N-Out|In N Out|In and Out","Five Guys","Shake Shack","Whataburger","Culver's|Culvers","Checkers|Rally's|Rallys","Dairy Queen|DQ","Steak 'n Shake|Steak n Shake","Smashburger","Fatburger","Wingstop","Buffalo Wild Wings|BWW|B-Dubs","Raising Cane's|Raising Canes|Canes","Zaxby's|Zaxbys","Bojangles|Bojangles'","Church's Chicken|Churchs","El Pollo Loco","Boston Market","Chipotle","Qdoba","Moe's Southwest Grill|Moe's|Moes","Del Taco","Taco John's|Taco Johns","Taco Cabana","Panda Express","P.F. Chang's|PF Changs","Pei Wei","Benihana","Pizza Hut","Domino's|Dominos","Papa John's|Papa Johns","Little Caesars|Little Caesar's","Papa Murphy's|Papa Murphys","Marco's Pizza|Marcos","Sbarro","Round Table Pizza|Round Table","Chuck E. Cheese|Chuck E Cheese","Blaze Pizza","MOD Pizza","California Pizza Kitchen|CPK","Olive Garden","Applebee's|Applebees","Chili's|Chilis","TGI Fridays|Fridays|TGI Friday's","Red Lobster","Outback Steakhouse|Outback","Texas Roadhouse","LongHorn Steakhouse|LongHorn","Red Robin","Ruby Tuesday","Cracker Barrel","Denny's|Dennys","IHOP","Waffle House","Bob Evans","Perkins","Golden Corral","Buca di Beppo","Carrabba's|Carrabbas","Maggiano's|Maggianos","The Cheesecake Factory|Cheesecake Factory","Hooters","Twin Peaks","BJ's Restaurant|BJ's|BJs","Dave & Buster's|Dave and Busters","Bonefish Grill","Ruth's Chris|Ruths Chris","Morton's|Mortons","Fogo de Chao","Bob's Big Boy|Big Boy","Friendly's|Friendlys","Logan's Roadhouse|Logans","Famous Dave's|Famous Daves","Sonny's BBQ|Sonnys","Dickey's Barbecue Pit|Dickeys","Cheddar's|Cheddars","Bahama Breeze","Joe's Crab Shack|Joes Crab Shack","Bubba Gump","Rainforest Cafe","Hard Rock Cafe","Long John Silver's|Long John Silvers","Captain D's|Captain Ds","Panera Bread|Panera","Jimmy John's|Jimmy Johns","Jersey Mike's|Jersey Mikes","Firehouse Subs","Potbelly","Quiznos","Jason's Deli|Jasons Deli","McAlister's Deli|McAlisters","Schlotzsky's|Schlotzskys","Which Wich","Sweetgreen","Cava","Noodles & Company|Noodles and Company","Zoës Kitchen|Zoes Kitchen","Starbucks","Dunkin'|Dunkin|Dunkin Donuts","Tim Hortons","Krispy Kreme","Tropical Smoothie Cafe","Smoothie King","Jamba|Jamba Juice","Auntie Anne's|Auntie Annes","Cinnabon","Baskin-Robbins|Baskin Robbins","Cold Stone Creamery|Cold Stone","Wetzel's Pretzels|Wetzels","Freddy's|Freddys","Krystal","Johnny Rockets","Ruby's Diner","Nando's|Nandos","Pret A Manger|Pret","Wawa","Sheetz","Jollibee","Yoshinoya","Habit Burger|The Habit","Portillo's|Portillos","Torchy's Tacos|Torchys","Cafe Rio","Golden Chick","Cook Out|Cookout"] },
  states: { name: 'US States', hint: 'all 50', items: [
    'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'
  ]},
  countries: { name: 'Countries', hint: 'the whole world', items: [
    'Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina','Armenia','Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan','Bolivia','Bosnia and Herzegovina|Bosnia','Botswana','Brazil','Brunei','Bulgaria','Burkina Faso','Burundi','Cambodia','Cameroon','Canada','Cape Verde|Cabo Verde','Central African Republic','Chad','Chile','China','Colombia','Comoros','Congo|Republic of the Congo','Democratic Republic of the Congo|DRC|DR Congo','Costa Rica','Croatia','Cuba','Cyprus','Czech Republic|Czechia','Denmark','Djibouti','Dominica','Dominican Republic','East Timor|Timor-Leste','Ecuador','Egypt','El Salvador','Equatorial Guinea','Eritrea','Estonia','Eswatini|Swaziland','Ethiopia','Fiji','Finland','France','Gabon','Gambia','Georgia','Germany','Ghana','Greece','Grenada','Guatemala','Guinea','Guinea-Bissau','Guyana','Haiti','Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy','Ivory Coast|Cote dIvoire','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','Kosovo','Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritius','Mexico','Micronesia','Moldova','Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar|Burma','Namibia','Nauru','Nepal','Netherlands|Holland','New Zealand','Nicaragua','Niger','Nigeria','North Korea','North Macedonia|Macedonia','Norway','Oman','Pakistan','Palau','Palestine','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal','Qatar','Romania','Russia','Rwanda','Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino','Sao Tome and Principe','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia','Solomon Islands','Somalia','South Africa','South Korea|Korea','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Sweden','Switzerland','Syria','Taiwan','Tajikistan','Tanzania','Thailand','Togo','Tonga','Trinidad and Tobago','Tunisia','Turkey|Turkiye','Turkmenistan','Tuvalu','Uganda','Ukraine','United Arab Emirates|UAE','United Kingdom|UK|Great Britain|Britain','United States|USA|US|America','Uruguay','Uzbekistan','Vanuatu','Vatican City|Vatican','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe','England','Scotland','Wales'
  ]},
  fruits: { name: 'Fruits', hint: 'common and exotic', items: [
    'Apple','Apricot','Avocado','Banana','Blackberry','Blueberry','Boysenberry','Cantaloupe','Cherry','Clementine','Coconut','Cranberry','Currant','Date','Dragon Fruit|Dragonfruit|Pitaya','Durian','Elderberry','Fig','Gooseberry','Grape','Grapefruit','Guava','Honeydew','Jackfruit','Kiwi','Kumquat','Lemon','Lime','Lychee|Litchi','Mandarin','Mango','Mangosteen','Melon','Mulberry','Nectarine','Olive','Orange','Papaya','Passion Fruit|Passionfruit','Peach','Pear','Persimmon','Pineapple','Plantain','Plum','Pomegranate','Pomelo','Prune','Quince','Raisin','Raspberry','Rambutan','Starfruit|Star Fruit|Carambola','Strawberry','Tangerine','Tomato','Watermelon','Yuzu','Acai','Huckleberry','Loquat','Kiwano','Cherimoya','Feijoa','Tamarind','Ugli Fruit','Breadfruit','Blood Orange','Lingonberry','Cloudberry','Marionberry','Salak','Longan','Soursop','Jujube','Sapodilla','Cucumber','Pumpkin','Pepper'
  ]},
  animals: { name: 'Animals', hint: 'any animal', items: [
    'Aardvark','Albatross','Alligator','Alpaca','Anaconda','Ant','Anteater','Antelope','Armadillo','Baboon','Badger','Bat','Bear','Beaver','Bee','Beetle','Bison','Boar','Buffalo','Butterfly','Camel','Capybara','Caribou','Cat','Caterpillar','Cheetah','Chicken','Chimpanzee|Chimp','Chinchilla','Chipmunk','Clam','Cobra','Cockroach','Cougar','Cow','Coyote','Crab','Crane','Cricket','Crocodile','Crow','Deer','Dingo','Dog','Dolphin','Donkey','Dove','Dragonfly','Duck','Eagle','Eel','Elephant','Elk','Emu','Falcon','Ferret','Finch','Flamingo','Fly','Fox','Frog','Gazelle','Gecko','Gerbil','Gibbon','Giraffe','Goat','Goldfish','Goose','Gorilla','Grasshopper','Guinea Pig','Hamster','Hare','Hawk','Hedgehog','Heron','Hippo|Hippopotamus','Horse','Hummingbird','Hyena','Iguana','Impala','Jackal','Jaguar','Jellyfish','Kangaroo','Koala','Komodo Dragon','Ladybug','Lemur','Leopard','Lion','Lizard','Llama','Lobster','Lynx','Macaw','Manatee','Meerkat','Mole','Mongoose','Monkey','Moose','Mosquito','Moth','Mouse','Mule','Narwhal','Newt','Octopus','Opossum|Possum','Orangutan','Orca|Killer Whale','Ostrich','Otter','Owl','Ox','Oyster','Panda','Panther','Parrot','Peacock','Pelican','Penguin','Pig','Pigeon','Piranha','Platypus','Polar Bear','Porcupine','Puma','Python','Quail','Rabbit|Bunny','Raccoon','Rat','Rattlesnake','Raven','Reindeer','Rhino|Rhinoceros','Robin','Salamander','Salmon','Scorpion','Seagull','Seahorse','Seal','Shark','Sheep','Shrimp','Skunk','Sloth','Slug','Snail','Snake','Sparrow','Spider','Squid','Squirrel','Starfish','Stingray','Stork','Swan','Tapir','Tarantula','Tiger','Toad','Tortoise','Toucan','Trout','Tuna','Turkey','Turtle','Vulture','Walrus','Warthog','Wasp','Weasel','Whale','Wolf','Wolverine','Wombat','Woodpecker','Worm','Yak','Zebra','Hornet','Termite','Bobcat','Ocelot','Ram','Lamb','Pony','Kitten','Puppy','Calf','Hen','Rooster','Bull','Magpie','Mink','Bluejay|Blue Jay','Cardinal','Canary','Goldfinch','Catfish','Cod','Sardine','Barracuda','Manta Ray','Axolotl','Chameleon','Hermit Crab','Koi','Gnu|Wildebeest','Okapi','Pangolin','Quokka','Kiwi'
  ]},
  colors: { name: 'Colors', hint: 'any named color', items: [
    'Red','Orange','Yellow','Green','Blue','Purple','Pink','Brown','Black','White','Gray|Grey','Violet','Indigo','Cyan','Magenta','Teal','Turquoise','Maroon','Navy','Beige','Tan','Gold','Silver','Bronze','Lavender','Lilac','Mauve','Peach','Coral','Salmon','Crimson','Scarlet','Burgundy','Olive','Lime','Mint','Emerald','Jade','Aqua','Azure','Cobalt','Sapphire','Cerulean','Ivory','Cream','Khaki','Charcoal','Amber','Mustard','Ochre','Rust','Copper','Fuchsia','Plum','Periwinkle','Chartreuse','Sepia','Taupe','Ruby','Rose','Lemon','Tangerine','Apricot','Sky Blue','Royal Blue','Forest Green','Hot Pink','Baby Blue','Eggplant','Mahogany','Champagne','Vermilion','Cinnamon','Chocolate','Caramel','Honey','Sand','Slate','Pewter','Platinum','Seafoam','Sage','Orchid','Raspberry','Cherry','Wine','Blush','Denim','Neon Green','Lime Green','Ebony','Onyx','Pearl'
  ]}
};

// --- matching helpers
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/&/g,'and').replace(/^the\s+/,'').replace(/[^a-z0-9]/g,'');
function lev(a, b) {
  if (Math.abs(a.length - b.length) > 4) return 99;
  const d = Array.from({length: a.length + 1}, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
  {
    d[i][j] = Math.min(d[i-1][j] + 1, d[i][j-1] + 1, d[i-1][j-1] + (a[i-1] === b[j-1] ? 0 : 1));
    if (i > 1 && j > 1 && a[i-1] === b[j-2] && a[i-2] === b[j-1]) d[i][j] = Math.min(d[i][j], d[i-2][j-2] + 1); // swapped letters
  }
  return d[a.length][b.length];
}
function buildIndex(items) {
  const map = new Map(), seen = new Set(), list = [];
  for (const item of items) {
    const parts = item.split('|'), id = norm(parts[0]);
    if (seen.has(id)) continue; seen.add(id);
    list.push({ id, label: parts[0] });
    for (const p of parts) { const k = norm(p); if (k && !map.has(k)) map.set(k, { id, label: parts[0] }); }
  }
  return { map, list };
}
function match(index, text) {
  const k = norm(text);
  if (!k) return null;
  if (index.map.has(k)) return index.map.get(k);
  if (k.length < 4) return null;
  // only fix small typos: about 1 wrong letter per 4 letters
  const allow = Math.max(1, Math.floor(k.length / 4));
  let best = null, bestD = allow + 1;
  for (const [key, val] of index.map) { if (Math.abs(key.length - k.length) > allow) continue; const dd = lev(k, key); if (dd < bestD) { bestD = dd; best = val; } }
  return best;
}


// --- custom categories (saved in this browser)
function loadCustom() { try { Object.assign(THEMES, JSON.parse(localStorage.getItem('quick_custom') || '{}')); } catch (e) {} }
function saveCustom() {
  const c = Object.fromEntries(Object.entries(THEMES).filter(([k]) => k.startsWith('c_')));
  try { localStorage.setItem('quick_custom', JSON.stringify(c)); } catch (e) {}
}
function addCustom(name, items) {
  const key = 'c_' + norm(name);
  THEMES[key] = { name, hint: `${items.length} answers · yours`, items };
  saveCustom();
  return key;
}
// turn pasted text into answers: one per line or comma separated, numbers/bullets ignored
function parseAnswers(text) {
  let name = '';
  let lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  if (lines[0] && /^name\s*:/i.test(lines[0])) name = lines.shift().replace(/^name\s*:/i, '').trim();
  lines = lines.filter(l => !/^hint\s*:/i.test(l) && !/^```/.test(l));
  if (lines.length === 1 && lines[0].includes(',')) lines = lines[0].split(',');
  const items = lines.map(l => l.replace(/^([-*•]|\d+[.)])\s*/, '').trim()).filter(l => norm(l));
  return { name, items };
}

// --- share links: category packed into the URL, then shortened with is.gd
// The game's folder address, for links people share. Uses the base address (not
// location) because some hosts show the page inside a frame whose own address is
// "about:srcdoc". Works whether the folder is .../quick/, .../quick or .../x.ek
const SITE = (() => {
  let b = String(document.baseURI || location.href).replace(/[?#].*$/, '');
  b = b.replace(/\/(index|tournament|play)(\.html)?$/i, '/');
  return /\/$/.test(b) ? b : b + '/';
})();
// Read ?name=value or #name=value (some hosts drop the ?part, so links use #)
function getParam(name) {
  const h = new URLSearchParams(String(location.hash || '').replace(/^#/, ''));
  const q = new URLSearchParams(location.search || '');
  return h.get(name) || q.get(name);
}
function clearParams() { try { history.replaceState(null, '', location.href.replace(/[?#].*$/, '')); } catch (e) {} }
// Pass a join code from the join page to the game page (survives hosts that drop
// everything after the page name when moving between pages)
function setHandoff(code) { try { localStorage.setItem('quick_handoff', JSON.stringify({ code, t: Date.now() })); } catch (e) {} }
function takeHandoff() {
  try {
    const h = JSON.parse(localStorage.getItem('quick_handoff') || 'null');
    localStorage.removeItem('quick_handoff');
    return h && Date.now() - h.t < 60000 ? h.code : null;
  } catch (e) { return null; }
}
async function packCategory(t) {
  const bytes = new TextEncoder().encode(JSON.stringify({ n: t.name, i: t.items }));
  const cs = new Blob([bytes]).stream().pipeThrough(new CompressionStream('deflate-raw'));
  const buf = new Uint8Array(await new Response(cs).arrayBuffer());
  let s = ''; buf.forEach(b => s += String.fromCharCode(b));
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
async function unpackCategory(str) {
  const bin = atob(str.replace(/-/g, '+').replace(/_/g, '/'));
  const bytes = Uint8Array.from(bin, c => c.charCodeAt(0));
  const ds = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
  const o = JSON.parse(await new Response(ds).text());
  return { name: String(o.n).slice(0, 40), items: o.i.map(String).slice(0, 2000) };
}
function shorten(url) {
  return new Promise(resolve => {
    const cb = 'isgd' + Date.now();
    const s = document.createElement('script');
    const done = v => { delete window[cb]; s.remove(); resolve(v); };
    window[cb] = r => done(r && r.shorturl ? r.shorturl : url);
    s.onerror = () => done(url);
    setTimeout(() => window[cb] && done(url), 5000);
    s.src = 'https://is.gd/create.php?format=json&callback=' + cb + '&url=' + encodeURIComponent(url);
    document.head.appendChild(s);
  });
}
async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; }
  catch (e) {
    const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select();
    let ok = false; try { ok = document.execCommand('copy'); } catch (e2) {} t.remove(); return ok;
  }
}
// share on phones (share sheet), copy on computers
async function shareOrCopy(url, title) {
  const touch = matchMedia('(pointer:coarse)').matches;
  if (touch && navigator.share) { try { await navigator.share({ title, url }); return 'shared'; } catch (e) {} }
  return (await copyText(url)) ? 'copied' : 'shown';
}

// --- turn <select class="seg"> into a row of big buttons; "Text (hint)" shows the hint small
function segmentize() {
  document.querySelectorAll('select.seg').forEach(sel => {
    const g = document.createElement('div'); g.className = 'seg';
    [...sel.options].forEach(o => {
      const b = document.createElement('button'); b.type = 'button';
      const m = o.text.match(/^(.*?)\s*\((.*)\)$/);
      b.innerHTML = m ? `${m[1]}<small>${m[2]}</small>` : o.text;
      if (o.selected) b.className = 'on';
      b.onclick = () => { sel.value = o.value; [...g.children].forEach(c => c.classList.remove('on')); b.classList.add('on'); sel.dispatchEvent(new Event('change')); };
      g.appendChild(b);
    });
    sel.style.display = 'none'; sel.after(g);
  });
}
