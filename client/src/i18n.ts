export type Locale = 'en' | 'fr' | 'es';

export interface Messages {
    languageLabel: string;
    toggleMenu: string;
    home: string;
    about: string;
    homeTitle: string;
    welcomeHeading: string;
    welcomeDescription: string;
    featuredGames: string;
    loadingGames: string;
    loadingGame: string;
    loadingContent: string;
    emptyGames: string;
    pagination: string;
    previous: string;
    next: string;
    previousPage: string;
    nextPage: string;
    pageSummary: (page: number, totalPages: number, totalGames: number) => string;
    gamesRequestFailed: (details: string) => string;
    requestError: (details: string) => string;
    gameRequestFailed: (details: string) => string;
    noGameId: string;
    notYetRated: string;
    aboutThisGame: string;
    supportThisGame: string;
    noGameInfo: string;
    viewDetails: string;
    gameDetailsTitle: string;
    backToGames: string;
    aboutTitle: string;
    aboutHeading: string;
    aboutParagraphOne: string;
    aboutParagraphTwo: string;
    aboutParagraphThree: string;
    communityComments: string;
    loadingComments: string;
    commentsLoadFailed: (details: string) => string;
    emptyComments: string;
    gameComments: string;
    addComment: string;
    commentPlaceholder: string;
    commentGuidance: (max: number) => string;
    enterComment: string;
    commentTooLong: (max: number) => string;
    commentSubmitFailed: (details: string) => string;
    posting: string;
    postComment: string;
    postingComment: string;
}

export const locales: Locale[] = ['en', 'fr', 'es'];

export const messages: Record<Locale, Messages> = {
    en: {
        languageLabel: 'Language',
        toggleMenu: 'Toggle menu',
        home: 'Home',
        about: 'About',
        homeTitle: 'Tailspin Toys - Crowdfunding your new favorite game!',
        welcomeHeading: 'Welcome to Tailspin Toys',
        welcomeDescription: 'Find your next game! And maybe even back one! Explore our collection!',
        featuredGames: 'Featured Games',
        loadingGames: 'Loading games',
        loadingGame: 'Loading game details',
        loadingContent: 'Loading content, please wait',
        emptyGames: 'No games available at the moment.',
        pagination: 'Pagination',
        previous: '← Previous',
        next: 'Next →',
        previousPage: 'Go to previous page',
        nextPage: 'Go to next page',
        pageSummary: (page, totalPages, totalGames) => `Page ${page} of ${totalPages} (${totalGames} games)`,
        gamesRequestFailed: (details) => `Failed to fetch games: ${details}`,
        requestError: (details) => `Error: ${details}`,
        gameRequestFailed: (details) => `Failed to fetch game: ${details}`,
        noGameId: 'No game ID provided',
        notYetRated: 'Not yet rated',
        aboutThisGame: 'About this game',
        supportThisGame: 'Support This Game',
        noGameInfo: 'No game information available',
        viewDetails: 'View details',
        gameDetailsTitle: 'Game Details - Tailspin Toys',
        backToGames: 'Back to all games',
        aboutTitle: 'About - Tailspin Toys',
        aboutHeading: 'About Tailspin Toys',
        aboutParagraphOne: 'Tailspin Toys is the premier crowdfunding platform dedicated to bringing board games with a development and DevOps twist to life. We believe that the same collaborative spirit, iteration cycles, and problem-solving that power modern software teams can make for endlessly engaging tabletop experiences. By focusing exclusively on games that explore themes like continuous integration, agile planning, container orchestration, and incident response, we offer a unique space where both seasoned developers and curious newcomers can back - and even contribute to - the games they\'re most passionate about.',
        aboutParagraphTwo: 'Our platform empowers creators at every stage of the design journey. From early-concept sketches through final prototype testing, Tailspin Toys provides tools for community feedback, stretch-goal planning, and beta-play sessions. Backers can join forums to share house rules, vote on art directions, or fund expansion modules that introduce new mechanics like "pipeline bottleneck" challenges or "rollback" rescue cards. We handle all the logistics of manufacturing and fulfillment, so designers can focus on the fun stuff - and supporters can look forward to high-quality components delivered right to their door.',
        aboutParagraphThree: 'The name "Tailspin Toys" reflects our love of both flight metaphors and that moment when a project takes on a life of its own - spinning through sprints, releases, and hotfixes until it soars. Founded by a team of developers who were always gamers at heart, we know firsthand how satisfying it is to conquer a tricky bug or pull off a flawless deployment - and how much more rewarding it can be to do beat your friends on a table (or work with them cooperatively to win together). Whether you\'re here to back your next favorite game or to launch your own DevOps-inspired design, welcome aboard. Let\'s game from here, together!',
        communityComments: 'Community comments',
        loadingComments: 'Loading comments...',
        commentsLoadFailed: (details) => `Unable to load comments: ${details}`,
        emptyComments: 'No comments yet. Be the first to share your thoughts.',
        gameComments: 'Game comments',
        addComment: 'Add a comment',
        commentPlaceholder: 'Share your thoughts about this game',
        commentGuidance: (max) => `Comments are anonymous and limited to ${max} characters.`,
        enterComment: 'Enter a comment before submitting.',
        commentTooLong: (max) => `Comments must be ${max} characters or fewer.`,
        commentSubmitFailed: (details) => `Unable to submit comment: ${details}`,
        posting: 'Posting...',
        postComment: 'Post comment',
        postingComment: 'Posting your comment...',
    },
    fr: {
        languageLabel: 'Langue',
        toggleMenu: 'Afficher le menu',
        home: 'Accueil',
        about: 'À propos',
        homeTitle: 'Tailspin Toys - Financez votre prochain jeu préféré !',
        welcomeHeading: 'Bienvenue chez Tailspin Toys',
        welcomeDescription: 'Trouvez votre prochain jeu, et pourquoi pas le soutenir ! Découvrez notre collection !',
        featuredGames: 'Jeux à découvrir',
        loadingGames: 'Chargement des jeux',
        loadingGame: 'Chargement des détails du jeu',
        loadingContent: 'Chargement du contenu, veuillez patienter',
        emptyGames: 'Aucun jeu n’est disponible pour le moment.',
        pagination: 'Pagination',
        previous: '← Précédent',
        next: 'Suivant →',
        previousPage: 'Aller à la page précédente',
        nextPage: 'Aller à la page suivante',
        pageSummary: (page, totalPages, totalGames) => `Page ${page} sur ${totalPages} (${totalGames} jeux)`,
        gamesRequestFailed: (details) => `Impossible de charger les jeux : ${details}`,
        requestError: (details) => `Erreur : ${details}`,
        gameRequestFailed: (details) => `Impossible de charger le jeu : ${details}`,
        noGameId: 'Aucun identifiant de jeu fourni',
        notYetRated: 'Pas encore noté',
        aboutThisGame: 'À propos de ce jeu',
        supportThisGame: 'Soutenir ce jeu',
        noGameInfo: 'Aucune information sur ce jeu n’est disponible',
        viewDetails: 'Voir les détails',
        gameDetailsTitle: 'Détails du jeu - Tailspin Toys',
        backToGames: 'Retour à tous les jeux',
        aboutTitle: 'À propos - Tailspin Toys',
        aboutHeading: 'À propos de Tailspin Toys',
        aboutParagraphOne: 'Tailspin Toys est la plateforme de financement participatif de référence pour donner vie à des jeux de société mêlant développement et DevOps. Nous sommes convaincus que l’esprit de collaboration, les cycles d’itération et la résolution de problèmes qui animent les équipes logicielles modernes peuvent donner naissance à des expériences de jeu de table captivantes. En nous consacrant aux jeux autour de thèmes comme l’intégration continue, la planification agile, l’orchestration de conteneurs et la gestion des incidents, nous proposons un espace unique où développeurs chevronnés et curieux peuvent soutenir — et même contribuer à — leurs jeux favoris.',
        aboutParagraphTwo: 'Notre plateforme accompagne les créateurs à chaque étape de leur parcours. Des premières esquisses aux essais du prototype final, Tailspin Toys met à leur disposition des outils de retours communautaires, de planification d’objectifs supplémentaires et de séances de test. Les contributeurs peuvent échanger des règles maison sur les forums, voter pour des directions artistiques ou financer des extensions introduisant de nouvelles mécaniques, comme les défis de « goulot d’étranglement du pipeline » ou les cartes de sauvetage « retour arrière ». Nous prenons en charge la fabrication et la livraison pour que les concepteurs se concentrent sur le plaisir du jeu et que les contributeurs reçoivent des composants de qualité chez eux.',
        aboutParagraphThree: 'Le nom « Tailspin Toys » évoque notre goût pour les métaphores aériennes et ces projets qui prennent leur envol, enchaînant sprints, versions et correctifs d’urgence. Fondée par des développeurs qui ont toujours aimé jouer, notre équipe sait combien il est gratifiant de résoudre un bug retors ou de réussir un déploiement sans accroc — et combien il est encore plus plaisant de battre ses amis autour d’une table, ou de gagner ensemble en coopérant. Que vous souhaitiez soutenir votre prochain jeu favori ou lancer votre propre création inspirée du DevOps, bienvenue à bord. Jouons ensemble !',
        communityComments: 'Commentaires de la communauté',
        loadingComments: 'Chargement des commentaires...',
        commentsLoadFailed: (details) => `Impossible de charger les commentaires : ${details}`,
        emptyComments: 'Aucun commentaire pour le moment. Soyez la première personne à partager votre avis.',
        gameComments: 'Commentaires sur le jeu',
        addComment: 'Ajouter un commentaire',
        commentPlaceholder: 'Partagez votre avis sur ce jeu',
        commentGuidance: (max) => `Les commentaires sont anonymes et limités à ${max} caractères.`,
        enterComment: 'Saisissez un commentaire avant de l’envoyer.',
        commentTooLong: (max) => `Les commentaires ne peuvent pas dépasser ${max} caractères.`,
        commentSubmitFailed: (details) => `Impossible d’envoyer le commentaire : ${details}`,
        posting: 'Publication...',
        postComment: 'Publier le commentaire',
        postingComment: 'Publication de votre commentaire...',
    },
    es: {
        languageLabel: 'Idioma',
        toggleMenu: 'Abrir el menú',
        home: 'Inicio',
        about: 'Acerca de',
        homeTitle: 'Tailspin Toys - ¡Financia tu próximo juego favorito!',
        welcomeHeading: 'Te damos la bienvenida a Tailspin Toys',
        welcomeDescription: '¡Encuentra tu próximo juego y quizá también puedas apoyarlo! ¡Explora nuestra colección!',
        featuredGames: 'Juegos destacados',
        loadingGames: 'Cargando juegos',
        loadingGame: 'Cargando los detalles del juego',
        loadingContent: 'Cargando contenido, espera un momento',
        emptyGames: 'No hay juegos disponibles en este momento.',
        pagination: 'Paginación',
        previous: '← Anterior',
        next: 'Siguiente →',
        previousPage: 'Ir a la página anterior',
        nextPage: 'Ir a la página siguiente',
        pageSummary: (page, totalPages, totalGames) => `Página ${page} de ${totalPages} (${totalGames} juegos)`,
        gamesRequestFailed: (details) => `No se pudieron cargar los juegos: ${details}`,
        requestError: (details) => `Error: ${details}`,
        gameRequestFailed: (details) => `No se pudo cargar el juego: ${details}`,
        noGameId: 'No se indicó el identificador del juego',
        notYetRated: 'Aún no tiene valoración',
        aboutThisGame: 'Acerca de este juego',
        supportThisGame: 'Apoya este juego',
        noGameInfo: 'No hay información disponible sobre este juego',
        viewDetails: 'Ver detalles',
        gameDetailsTitle: 'Detalles del juego - Tailspin Toys',
        backToGames: 'Volver a todos los juegos',
        aboutTitle: 'Acerca de - Tailspin Toys',
        aboutHeading: 'Acerca de Tailspin Toys',
        aboutParagraphOne: 'Tailspin Toys es la plataforma de financiación colectiva de referencia para dar vida a juegos de mesa con un toque de desarrollo y DevOps. Creemos que el espíritu colaborativo, los ciclos de iteración y la resolución de problemas que impulsan a los equipos de software modernos pueden crear experiencias de mesa apasionantes. Nos centramos exclusivamente en juegos sobre temas como la integración continua, la planificación ágil, la orquestación de contenedores y la respuesta ante incidentes. Así ofrecemos un espacio único donde tanto desarrolladores experimentados como personas curiosas pueden apoyar —e incluso contribuir a— los juegos que más les gustan.',
        aboutParagraphTwo: 'Nuestra plataforma ayuda a los creadores en cada etapa del proceso de diseño. Desde los primeros bocetos hasta las pruebas del prototipo final, Tailspin Toys ofrece herramientas para recibir comentarios de la comunidad, planificar objetivos adicionales y organizar sesiones de prueba. Quienes apoyan los proyectos pueden compartir reglas caseras en los foros, votar por estilos artísticos o financiar expansiones con nuevas mecánicas, como retos de «cuello de botella en el pipeline» o cartas de rescate de «reversión». Nos ocupamos de la fabricación y el envío para que los diseñadores se centren en lo divertido y quienes apoyan los proyectos reciban componentes de calidad en casa.',
        aboutParagraphThree: 'El nombre «Tailspin Toys» refleja nuestro amor por las metáforas de vuelo y por ese momento en que un proyecto cobra vida propia y avanza entre sprints, lanzamientos y correcciones urgentes hasta despegar. Nuestro equipo, formado por desarrolladores que siempre llevaron dentro un espíritu jugón, sabe lo satisfactorio que es resolver un error complicado o completar un despliegue impecable, y cuánto más gratificante puede ser vencer a tus amistades en la mesa —o colaborar para ganar juntos—. Tanto si vienes a apoyar tu próximo juego favorito como a lanzar tu propio diseño inspirado en DevOps, ¡te damos la bienvenida! Juguemos juntos.',
        communityComments: 'Comentarios de la comunidad',
        loadingComments: 'Cargando comentarios...',
        commentsLoadFailed: (details) => `No se pudieron cargar los comentarios: ${details}`,
        emptyComments: 'Todavía no hay comentarios. Sé la primera persona en compartir tu opinión.',
        gameComments: 'Comentarios del juego',
        addComment: 'Añadir un comentario',
        commentPlaceholder: 'Comparte tu opinión sobre este juego',
        commentGuidance: (max) => `Los comentarios son anónimos y tienen un límite de ${max} caracteres.`,
        enterComment: 'Escribe un comentario antes de enviarlo.',
        commentTooLong: (max) => `Los comentarios no pueden superar los ${max} caracteres.`,
        commentSubmitFailed: (details) => `No se pudo enviar el comentario: ${details}`,
        posting: 'Publicando...',
        postComment: 'Publicar comentario',
        postingComment: 'Publicando tu comentario...',
    },
};

const categoryNames: Record<string, Partial<Record<Locale, string>>> = {
    Strategy: { fr: 'Stratégie', es: 'Estrategia' },
    Puzzle: { fr: 'Casse-tête', es: 'Rompecabezas' },
    Simulation: { fr: 'Simulation', es: 'Simulación' },
    Adventure: { fr: 'Aventure', es: 'Aventura' },
    Action: { fr: 'Action', es: 'Acción' },
};

const gameDescriptions: Record<string, Partial<Record<Locale, string>>> = {
    'DevOps Dominion': {
        fr: 'Dans DevOps Dominion, la planification stratégique rencontre des tactiques de déploiement avancées sur un champ de bataille numérique trépidant. Mona mène votre équipe de guerriers numériques à travers des pipelines orchestrés et des escarmouches de microservices ; chaque commande vous donne un avantage décisif. Soutenez ce jeu sur notre plateforme de financement participatif !',
        es: 'En DevOps Dominion, la planificación estratégica se une a tácticas avanzadas de despliegue en un campo de batalla de código trepidante. Mona guía a tu equipo de guerreros digitales por pipelines orquestados y escaramuzas de microservicios, y cada comando aporta una ventaja competitiva. ¡Apoya este juego en nuestra plataforma de financiación colectiva!',
    },
    'Pipeline Conquest': {
        fr: 'Pipeline Conquest vous met au défi d’optimiser les flux d’intégration continue tout en faisant face aux pannes système imprévues. Avec Mona à vos côtés, organisez en temps réel des compilations automatisées et des pipelines de déploiement pour assurer une victoire numérique durable. Soutenez ce jeu sur notre plateforme de financement participatif !',
        es: 'Pipeline Conquest te desafía a optimizar los flujos de integración continua mientras haces frente a fallos inesperados del sistema. Con Mona a tu lado, organiza compilaciones automatizadas y pipelines de despliegue en tiempo real para lograr una victoria digital duradera. ¡Apoya este juego en nuestra plataforma de financiación colectiva!',
    },
    'Server Siege': {
        fr: 'Server Siege vous plonge au cœur d’une forteresse numérique assiégée par des cybermenaces incessantes. Mona rassemble vos défenses tandis que vous coordonnez équilibreurs de charge et contrôle de versions pour fortifier votre réseau. Soutenez ce jeu sur notre plateforme de financement participatif !',
        es: 'Server Siege te sumerge en una fortaleza digital asediada por ciberamenazas implacables. Mona reúne a tus defensas mientras coordinas balanceadores de carga y control de versiones para reforzar tu red. ¡Apoya este juego en nuestra plataforma de financiación colectiva!',
    },
    'Repo Rulers': {
        fr: 'Repo Rulers exige des tactiques affûtées et une gestion agile des dépôts pour dominer des serveurs interconnectés. Sous la houlette de Mona, appliquez des protections de branches et gérez les pull requests dans une arène à haut risque où la précision est essentielle. Soutenez ce jeu sur notre plateforme de financement participatif !',
        es: 'Repo Rulers exige tácticas precisas y una gestión ágil de repositorios para dominar servidores interconectados. Con Mona como guía, aplica protecciones de ramas y gestiona pull requests en una arena de alto riesgo donde la precisión es esencial. ¡Apoya este juego en nuestra plataforma de financiación colectiva!',
    },
    'Code Puzzle Chronicles': {
        fr: 'Code Puzzle Chronicles propose des casse-têtes qui dévoilent des algorithmes énigmatiques et des quêtes de débogage obscures. Mona vous accompagne à chaque étape et invite les codeurs à maîtriser des énigmes logiques inspirées de défis de programmation réels. Soutenez ce jeu sur notre plateforme de financement participatif !',
        es: 'Code Puzzle Chronicles ofrece desafíos que desentrañan algoritmos crípticos y misteriosas misiones de depuración. Mona te acompaña en cada giro e invita a quienes programan a dominar rompecabezas lógicos inspirados en problemas reales de programación. ¡Apoya este juego en nuestra plataforma de financiación colectiva!',
    },
    'Merge Conflict Mystery': {
        fr: 'Merge Conflict Mystery vous entraîne dans un labyrinthe de fusions de code où chaque pièce du puzzle peut mener à une découverte. Avec l’aide de Mona pour décoder les erreurs, résolvez les conflits et simplifiez l’intégration entre des branches complexes. Soutenez ce jeu sur notre plateforme de financement participatif !',
        es: 'Merge Conflict Mystery te adentra en un laberinto de fusiones de código donde cada pieza del rompecabezas puede ser un gran hallazgo. Con Mona ayudándote a descifrar los errores, resuelve conflictos y agiliza la integración entre ramas complejas. ¡Apoya este juego en nuestra plataforma de financiación colectiva!',
    },
    'Bug Buster Brainteaser': {
        fr: 'Bug Buster Brainteaser met à l’épreuve votre esprit d’analyse avec des énigmes inspirées de véritables aventures de débogage. Mona vous aide à débusquer les bugs insaisissables et transforme chaque défi en une quête gratifiante de clarté et d’efficacité. Soutenez ce jeu sur notre plateforme de financement participatif !',
        es: 'Bug Buster Brainteaser pone a prueba tu capacidad de análisis con ingeniosos rompecabezas inspirados en aventuras reales de depuración. Mona te ayuda a localizar errores esquivos y convierte cada reto en una gratificante búsqueda de claridad y eficacia. ¡Apoya este juego en nuestra plataforma de financiación colectiva!',
    },
    'Stack Trace Secrets': {
        fr: 'Stack Trace Secrets vous invite à déchiffrer des journaux d’erreurs complexes et à révéler des indices cachés dans votre code. Avec les conseils de Mona, chaque message d’erreur devient une piste pour perfectionner votre architecture logicielle. Soutenez ce jeu sur notre plateforme de financement participatif !',
        es: 'Stack Trace Secrets te invita a descifrar registros de errores por capas y descubrir pistas ocultas en tu código. Con los consejos de Mona, cada mensaje de error se convierte en una pista para perfeccionar tu arquitectura de software. ¡Apoya este juego en nuestra plataforma de financiación colectiva!',
    },
    'Virtual Server Simulator': {
        fr: 'Virtual Server Simulator vous place dans un centre de données ultra-réaliste où la gestion des ressources est essentielle à votre survie. Mona vous guide pour équilibrer la charge et optimiser les performances des serveurs dans un écosystème virtuel dynamique. Soutenez ce jeu sur notre plateforme de financement participatif !',
        es: 'Virtual Server Simulator te sitúa en un centro de datos hiperrealista donde gestionar los recursos es clave para sobrevivir. Mona te guía para equilibrar la carga y optimizar el rendimiento de los servidores en un ecosistema virtual dinámico. ¡Apoya este juego en nuestra plataforma de financiación colectiva!',
    },
    'Container Chaos': {
        fr: 'Container Chaos recrée l’environnement à haut risque de l’orchestration de conteneurs, où chaque commande peut améliorer ou perturber vos systèmes. Les conseils de Mona vous aideront à naviguer dans l’univers mouvementé de Docker et des services cloud évolutifs. Soutenez ce jeu sur notre plateforme de financement participatif !',
        es: 'Container Chaos recrea el entorno de alto riesgo de la orquestación de contenedores, donde cada comando puede optimizar o alterar tus sistemas. Los consejos de Mona te ayudarán a desenvolverte en el vertiginoso mundo de Docker y los servicios cloud escalables. ¡Apoya este juego en nuestra plataforma de financiación colectiva!',
    },
    'Infrastructure Innovator': {
        fr: 'Infrastructure Innovator simule un vaste écosystème numérique qui vous met au défi de bâtir des réseaux robustes à partir de rien. Grâce aux conseils stratégiques de Mona, concevez et déployez des systèmes capables de résister à des tests de charge virtuels incessants. Soutenez ce jeu sur notre plateforme de financement participatif !',
        es: 'Infrastructure Innovator simula un extenso ecosistema digital que te reta a construir redes sólidas desde cero. Con los consejos estratégicos de Mona, diseña e implementa sistemas capaces de resistir pruebas de estrés virtuales implacables. ¡Apoya este juego en nuestra plataforma de financiación colectiva!',
    },
    'Deployment Dynasty': {
        fr: 'Deployment Dynasty vous permet de bâtir et de gérer des empires numériques dans des environnements simulés complexes. Mona met son expertise à votre service pour maîtriser la montée en charge, la supervision et les routines d’autoréparation, et préserver votre domaine virtuel. Soutenez ce jeu sur notre plateforme de financement participatif !',
        es: 'Deployment Dynasty te permite crear y gestionar imperios digitales en complejos entornos simulados. Mona pone su experiencia a tu servicio para dominar el escalado, la monitorización y las rutinas de autorreparación, y mantener tu dominio virtual. ¡Apoya este juego en nuestra plataforma de financiación colectiva!',
    },
    'Code Quest Odyssey': {
        fr: 'Code Quest Odyssey vous lance dans une épopée à travers des royaumes numériques enchantés où vos talents de programmation vous ouvrent les portes de la découverte. Accompagné de Mona, déchiffrez d’anciens codes sources et relevez des défis mêlant récit et ingéniosité technique. Soutenez ce jeu sur notre plateforme de financement participatif !',
        es: 'Code Quest Odyssey te embarca en un viaje épico por reinos digitales encantados donde tus habilidades de programación te permiten descubrir nuevos mundos. Acompañado por Mona, descifra antiguos códigos fuente y supera desafíos que combinan narrativa e ingenio técnico. ¡Apoya este juego en nuestra plataforma de financiación colectiva!',
    },
    'Binary Frontier': {
        fr: 'Binary Frontier vous transporte dans un cybermonde inexploré où chaque code innovant révèle un royaume secret. Guidé par Mona, parcourez de vastes paysages numériques et partez à la découverte de nouveaux territoires dans une aventure mystérieuse autour du code. Soutenez ce jeu sur notre plateforme de financement participatif !',
        es: 'Binary Frontier te transporta a un ciberespacio inexplorado donde cada código innovador abre un reino secreto. Con Mona como guía, explora vastos paisajes digitales y descubre nuevos territorios en una aventura llena de misterio y programación. ¡Apoya este juego en nuestra plataforma de financiación colectiva!',
    },
    'Digital Debugger\'s Dream': {
        fr: 'Digital Debugger’s Dream propose une aventure immersive qui mêle enquêtes et scénarios de débogage inspirés du réel. Aux côtés de Mona, chaque étape vous rapproche du mystère entourant une énigme cybernétique à résoudre. Soutenez ce jeu sur notre plateforme de financement participatif !',
        es: 'Digital Debugger’s Dream ofrece una aventura inmersiva que combina misiones de investigación con situaciones reales de depuración. Con Mona a tu lado, cada paso profundiza el misterio de un enigma cibernético que espera ser resuelto. ¡Apoya este juego en nuestra plataforma de financiación colectiva!',
    },
    'Refactor Realms': {
        fr: 'Refactor Realms vous invite dans un monde où l’amélioration méthodique du code transforme d’anciennes civilisations numériques. Avec les conseils de Mona, modernisez des systèmes historiques pour en faire des chefs-d’œuvre rationalisés tout en explorant des environnements virtuels époustouflants. Soutenez ce jeu sur notre plateforme de financement participatif !',
        es: 'Refactor Realms te invita a un mundo donde la mejora metódica del código transforma antiguas civilizaciones digitales. Con la guía de Mona, convierte sistemas heredados en obras maestras optimizadas mientras exploras entornos virtuales impresionantes. ¡Apoya este juego en nuestra plataforma de financiación colectiva!',
    },
    'Script Strike': {
        fr: 'Script Strike vous propulse dans un affrontement de programmation trépidant où chaque frappe peut changer le cours du combat. Mona rallie vos forces pour relever des défis en temps réel qui associent réflexes et exécution habile de scripts. Soutenez ce jeu sur notre plateforme de financement participatif !',
        es: 'Script Strike te lanza a una batalla de programación trepidante donde cada pulsación puede cambiar el rumbo del conflicto. Mona reúne a tus fuerzas para afrontar desafíos en tiempo real que combinan reflejos y ejecución inteligente de scripts. ¡Apoya este juego en nuestra plataforma de financiación colectiva!',
    },
    'Terminal Turbulence': {
        fr: 'Terminal Turbulence vous oppose à des confrontations effrénées en ligne de commande où le timing et la précision sont essentiels. L’expertise numérique de Mona vous aidera à élaborer vos stratégies tandis que vous traversez des environnements de serveurs chaotiques. Soutenez ce jeu sur notre plateforme de financement participatif !',
        es: 'Terminal Turbulence te enfrenta a vertiginosas batallas de línea de comandos donde el tiempo y la precisión son esenciales. La experiencia digital de Mona te ayudará a decidir cómo responder mientras atraviesas entornos de servidores caóticos. ¡Apoya este juego en nuestra plataforma de financiación colectiva!',
    },
    'Repo Rampart': {
        fr: 'Repo Rampart vous plonge dans des missions de défense palpitantes où chaque commande doit protéger vos précieuses bases de code. Avec Mona aux commandes de votre stratégie, déjouez les intrusions et lancez des contre-mesures rapides dans des séquences d’action électrisantes. Soutenez ce jeu sur notre plateforme de financement participatif !',
        es: 'Repo Rampart te sumerge en emocionantes misiones de defensa donde cada comando debe proteger tus valiosas bases de código. Con Mona al frente de la estrategia, evita intrusiones y ejecuta contramedidas rápidas en secuencias de acción electrizantes. ¡Apoya este juego en nuestra plataforma de financiación colectiva!',
    },
    'Syntax Smashdown': {
        fr: 'Syntax Smashdown offre une expérience d’arcade exaltante où des réflexes de programmation rapides décident de l’issue de batailles numériques explosives. Guidé par Mona, la courageuse, éliminez les bugs et visez le meilleur score dans un univers où la syntaxe est l’arme ultime. Soutenez ce jeu sur notre plateforme de financement participatif !',
        es: 'Syntax Smashdown ofrece una emocionante experiencia arcade donde los reflejos de programación determinan el resultado de explosivas batallas digitales. Con la intrépida Mona como guía, elimina fallos y consigue la máxima puntuación en un mundo donde la sintaxis es el arma definitiva. ¡Apoya este juego en nuestra plataforma de financiación colectiva!',
    },
    'Cloud Conqueror': {
        fr: 'Cloud Conqueror vous entraîne dans une bataille aérienne à haut risque contre des services cloud rebelles. Avec Mona comme copilote, traversez des cieux orageux et déjouez vos adversaires numériques pour reprendre le contrôle de votre domaine virtuel. Soutenez ce jeu sur notre plateforme de financement participatif !',
        es: 'Cloud Conqueror te lanza a una batalla aérea de alto riesgo contra servicios cloud rebeldes. Con Mona como copiloto, atraviesa cielos tormentosos y supera a tus adversarios digitales para recuperar el control de tu dominio virtual. ¡Apoya este juego en nuestra plataforma de financiación colectiva!',
    },
};

export function getLocale(value: string | undefined): Locale {
    return locales.find((locale) => locale === value) ?? 'en';
}

export function getCategoryName(name: string, locale: Locale): string {
    return categoryNames[name]?.[locale] ?? name;
}

export function getGameDescription(title: string, description: string, locale: Locale): string {
    return gameDescriptions[title]?.[locale] ?? description;
}
