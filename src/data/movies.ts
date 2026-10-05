export interface Movie {
  id: string;
  slug: string;
  title: string;
  year: string;
  genres: string[];
  runtime: string;
  director: string;
  rating: string;
  description: string;
  poster: string;
  backdrop: string;
  featured: boolean;
  whyWatch: string[];
  bestFor: string[];
  aiInsight: string;
  tagline: string;
  backdropPosition?: string;
}

export const movies: Movie[] = [
  {
    id: "interstellar",
    slug: "interstellar",
    title: "Interstellar",
    year: "2014",
    genres: ["Sci-Fi", "Drama", "Adventure"],
    runtime: "2h 49m",
    director: "Christopher Nolan",
    rating: "8.7",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival as Earth faces agricultural collapse.",
    poster: "/movies/interstellar-poster.jpg",
    backdrop: "/movies/interstellar-backdrop.jpg",
    featured: true,
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    whyWatch: [
      "Visually breathtaking depiction of wormholes and black holes powered by real theoretical physics.",
      "Hans Zimmer's iconic organ-driven score that elevates emotional stakes to cosmic proportions.",
      "A deeply human story about parental love spanning time and space dimensions."
    ],
    bestFor: [
      "Hard sci-fi enthusiasts",
      "Christopher Nolan fans",
      "Viewers who love high-concept emotional epics"
    ],
    aiInsight: "Interstellar bridges astrophysics with raw human intimacy. It explores the physics of time dilation alongside the unbreakable bond between father and daughter."
  },
  {
    id: "dune-part-two",
    slug: "dune-part-two",
    title: "Dune: Part Two",
    year: "2024",
    genres: ["Sci-Fi", "Adventure", "Action"],
    runtime: "2h 46m",
    director: "Denis Villeneuve",
    rating: "8.6",
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    poster: "/movies/dune-part-two-poster.jpg",
    backdrop: "/movies/dune-part-two-backdrop.jpg",
    featured: true,
    tagline: "Long live the fighters.",
    whyWatch: [
      "Masterclass in world-building, sound design, and cinematic scale on Arrakis.",
      "A terrifying and nuanced exploration of religious fanaticism and political prophecy.",
      "Spectacular sequence of sand-worm riding and arena battles."
    ],
    bestFor: [
      "Epic fantasy & sci-fi lovers",
      "Fans of political intrigue & world-building",
      "Immersive audio-visual purists"
    ],
    aiInsight: "Villeneuve delivers a modern sci-fi masterpiece. Unlike typical hero journeys, Dune: Part Two warns against the dangerous allure of charismatic messiahs."
  },
  {
    id: "oppenheimer",
    slug: "oppenheimer",
    title: "Oppenheimer",
    year: "2023",
    genres: ["Biography", "Drama", "History"],
    runtime: "3h 00m",
    director: "Christopher Nolan",
    rating: "8.9",
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
    poster: "/movies/oppenheimer-poster.jpg",
    backdrop: "/movies/oppenheimer-backdrop.jpg",
    featured: true,
    tagline: "The world changes forever.",
    whyWatch: [
      "Hypnotic non-linear editing that turns historical physics into a visceral psychological thriller.",
      "Career-defining performance by Cillian Murphy capturing existential guilt.",
      "Tactile 70mm IMAX cinematography without digital CGI for the Trinity Test."
    ],
    bestFor: [
      "History & drama enthusiasts",
      "Character study appreciators",
      "Cinematic craftsmanship aficionados"
    ],
    aiInsight: "Oppenheimer is a haunting meditation on scientific ambition and its unintended consequences, crafted with unmatched tension."
  },
  {
    id: "blade-runner-2049",
    slug: "blade-runner-2049",
    title: "Blade Runner 2049",
    year: "2017",
    genres: ["Sci-Fi", "Mystery", "Drama"],
    runtime: "2h 44m",
    director: "Denis Villeneuve",
    rating: "8.0",
    description: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.",
    poster: "/movies/blade-runner-2049-poster.jpg",
    backdrop: "/movies/blade-runner-2049-backdrop.jpg",
    featured: true,
    tagline: "The key to the future is finally unearthed.",
    whyWatch: [
      "Academy Award-winning cinematography by Roger Deakins featuring unforgettable color palettes.",
      "Profound philosophical interrogation of consciousness, soul, and artificial identity.",
      "Atmospheric, slow-burn cyberpunk world-building that honors and expands the original classic."
    ],
    bestFor: [
      "Neo-noir & cyberpunk lovers",
      "Cinematography students & visual enthusiasts",
      "Thoughtful sci-fi fans"
    ],
    aiInsight: "Blade Runner 2049 elevates visual storytelling into art. It asks what makes a life real when memories can be manufactured."
  },
  {
    id: "the-dark-knight",
    slug: "the-dark-knight",
    title: "The Dark Knight",
    year: "2008",
    genres: ["Action", "Crime", "Drama"],
    runtime: "2h 32m",
    director: "Christopher Nolan",
    rating: "9.0",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological tests of his ability to fight injustice.",
    poster: "/movies/the-dark-knight-poster.jpg",
    backdrop: "/movies/the-dark-knight-backdrop.jpg",
    featured: true,
    tagline: "Welcome to a world without rules.",
    whyWatch: [
      "Heath Ledger's legendary, Oscar-winning performance as the Joker.",
      "Gripping crime-saga structure inspired by Michael Mann's Heat.",
      "Relentless ethical dilemmas testing the line between hero and vigilante."
    ],
    bestFor: [
      "Crime thriller & comic book fans",
      "Action cinema lovers",
      "Fans of complex antagonist dynamics"
    ],
    aiInsight: "The Dark Knight transcends the superhero genre to become a towering crime epic about order, chaos, and moral compromise in a decaying metropolis."
  },
  {
    id: "inception",
    slug: "inception",
    title: "Inception",
    year: "2010",
    genres: ["Sci-Fi", "Action", "Adventure"],
    runtime: "2h 28m",
    director: "Christopher Nolan",
    rating: "8.8",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    poster: "/movies/inception-poster.jpg",
    backdrop: "/movies/inception-backdrop.jpg",
    featured: false,
    tagline: "Your mind is the scene of the crime.",
    whyWatch: [
      "Mind-bending multi-tiered dream heist structure that keeps audiences on the edge of their seats.",
      "Practical visual effects like the rotating hallway fight scene.",
      "Propulsive Hans Zimmer soundtrack driven by Edith Piaf's reversed tempo."
    ],
    bestFor: [
      "Heist & puzzle movie lovers",
      "Sci-fi thriller fans",
      "Adrenaline & concept seekers"
    ],
    aiInsight: "Inception operates like a watchmaker's dream—intricate, precise, and endlessly debate-worthy down to its ambiguous spinning top finale."
  },
  {
    id: "the-martian",
    slug: "the-martian",
    title: "The Martian",
    year: "2015",
    genres: ["Sci-Fi", "Adventure", "Comedy"],
    runtime: "2h 24m",
    director: "Ridley Scott",
    rating: "8.0",
    description: "An astronaut becomes stranded on Mars after his team assumes him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive.",
    poster: "/movies/the-martian-poster.jpg",
    backdrop: "/movies/the-martian-backdrop.jpg",
    featured: false,
    tagline: "Help is only 140 million miles away.",
    whyWatch: [
      "Optimistic and humor-infused tribute to human problem solving ('science the s*** out of this').",
      "Matt Damon's magnetic solo performance carrying survival chemistry.",
      "Scientifically grounded space rescue operations overseen by NASA advisors."
    ],
    bestFor: [
      "Space exploration fans",
      "Survival story appreciators",
      "Viewers seeking uplifting, smart entertainment"
    ],
    aiInsight: "The Martian turns isolated survival into a joyful celebration of human grit, optimism, and global scientific cooperation."
  },
  {
    id: "avatar",
    slug: "avatar",
    title: "Avatar",
    year: "2009",
    genres: ["Sci-Fi", "Action", "Adventure"],
    runtime: "2h 42m",
    director: "James Cameron",
    rating: "7.9",
    description: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
    poster: "/movies/avatar-poster.jpg",
    backdrop: "/movies/avatar-backdrop.jpg",
    featured: false,
    tagline: "Enter the world of Pandora.",
    whyWatch: [
      "Groundbreaking 3D visual technology that set new standards in world creation.",
      "Bioluminescent flora and fauna design of Pandora's alien ecosystem.",
      "High-stakes environmental theme and adrenaline-fueled aerial combat."
    ],
    bestFor: [
      "Blockbuster spectacle fans",
      "World-building enthusiasts",
      "3D & visual effects pioneers"
    ],
    aiInsight: "Avatar remains a landmark in cinematic technology—an immersive escape that redefined scale and visual fantasy in cinema."
  },
  {
    id: "arrival",
    slug: "arrival",
    title: "Arrival",
    year: "2016",
    genres: ["Sci-Fi", "Drama", "Mystery"],
    runtime: "1h 56m",
    director: "Denis Villeneuve",
    rating: "7.9",
    description: "A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.",
    poster: "/movies/arrival-poster.jpg",
    backdrop: "/movies/arrival-backdrop.jpg",
    featured: false,
    tagline: "Language is the first weapon drawn.",
    whyWatch: [
      "Intelligent sci-fi centered on linguistics, perception of time, and empathy over weapons.",
      "Amy Adams' emotionally subtle performance as Dr. Louise Banks.",
      "Stunning non-linear twist that recontextualizes memory and destiny."
    ],
    bestFor: [
      "Philosophical sci-fi lovers",
      "Fans of quiet tension & intellect",
      "Emotionally resonant story seekers"
    ],
    aiInsight: "Arrival explores how language shapes our reality. It's a poignant testament to loving fully even when knowing the heartbreak ahead."
  },
  {
    id: "tenet",
    slug: "tenet",
    title: "Tenet",
    year: "2020",
    genres: ["Sci-Fi", "Action", "Thriller"],
    runtime: "2h 30m",
    director: "Christopher Nolan",
    rating: "7.3",
    description: "Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.",
    poster: "/movies/tenet-poster.jpg",
    backdrop: "/movies/tenet-backdrop.jpg",
    featured: false,
    tagline: "Time runs out.",
    whyWatch: [
      "Unprecedented entropy-inversion action set pieces filmed with real cars and planes in reverse.",
      "Ludwig Göransson's pulse-pounding, backward-forward musical score.",
      "Slick international espionage combined with quantum temporal mechanics."
    ],
    bestFor: [
      "Action puzzle lovers",
      "Audio-visual thrill seekers",
      "Nolan temporal theory enthusiasts"
    ],
    aiInsight: "Tenet is pure kinetic cinema—a high-concept spy puzzle that rewards multiple viewings as temporal threads intertw forward and backward."
  },
  {
    id: "the-prestige",
    slug: "the-prestige",
    title: "The Prestige",
    year: "2006",
    genres: ["Drama", "Mystery", "Sci-Fi"],
    runtime: "2h 10m",
    director: "Christopher Nolan",
    rating: "8.5",
    description: "After a tragic accident, two stage magicians in 1890s London engage in a battle to create the ultimate illusion while sacrificing everything they have to outsmart each other.",
    poster: "/movies/the-prestige-poster.jpg",
    backdrop: "/movies/the-prestige-backdrop.jpg",
    featured: false,
    tagline: "Are you watching closely?",
    whyWatch: [
      "Ferocious lead performances by Christian Bale and Hugh Jackman.",
      "Brilliant three-act structure corresponding to magic's Pledge, Turn, and Prestige.",
      "Obsessive rivalry story with sci-fi twists featuring David Bowie as Nikola Tesla."
    ],
    bestFor: [
      "Rivalry & obsession thrillers",
      "Twist ending lovers",
      "Period drama with dark mystery"
    ],
    aiInsight: "The Prestige is Nolan's secret thesis on filmmaking itself—where dedication requires sacrifice and magic demands complete deception."
  },
  {
    id: "whiplash",
    slug: "whiplash",
    title: "Whiplash",
    year: "2014",
    genres: ["Drama", "Music"],
    runtime: "1h 47m",
    director: "Damien Chazelle",
    rating: "8.5",
    description: "A promising young drummer enlists at a cut-throat music conservatory where his instructor will stop at nothing to realize a student's potential.",
    poster: "/movies/whiplash-poster.jpg",
    backdrop: "/movies/whiplash-backdrop.jpg",
    featured: false,
    tagline: "The pursuit of perfection comes at a cost.",
    whyWatch: [
      "Electrifying intensity between Miles Teller and J.K. Simmons' Oscar-winning performance.",
      "Editing synchronized like a musical solo that turns jazz drumming into war.",
      "Provocative question: Is psychological abuse justified to achieve artistic greatness?"
    ],
    bestFor: [
      "Intense character drama lovers",
      "Musicians & perfectionists",
      "High-octane non-action thriller seekers"
    ],
    aiInsight: "Whiplash is a visceral battle of wills that treats musical ambition with the terrifying urgency of a survival fight."
  }
];

export const heroMovies = movies.filter(m => m.featured);

export function getMovieBySlug(slug: string): Movie | undefined {
  return movies.find(m => m.slug.toLowerCase() === slug.toLowerCase());
}

export function getSimilarMovies(slug: string, limit: number = 4): Movie[] {
  const current = getMovieBySlug(slug);
  if (!current) return movies.slice(0, limit);
  return movies
    .filter(m => m.slug !== slug)
    .filter(m => m.genres.some(g => current.genres.includes(g)))
    .slice(0, limit);
}
