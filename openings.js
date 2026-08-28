// Données des ouvertures : nom, code ECO, description et liste des coups
// (san, couleur, case de départ/arrivée, capture éventuelle, roque éventuel, commentaire pédagogique).
const OPENINGS = {

  italienne: {
    name: "Ouverture Italienne",
    eco: "C50",
    description: "Une des ouvertures les plus anciennes du jeu d'échecs : les Blancs développent rapidement leur fou en visant f7, le point faible du camp noir.",
    moves: [
      { san: "e4",  color: "w", from: "e2", to: "e4", comment: "Le pion roi avance de e2 à e4 : les Blancs prennent le centre et ouvrent la diagonale de leur fou f1 et de leur dame." },
      { san: "e5",  color: "b", from: "e7", to: "e5", comment: "Les Noirs répondent symétriquement, revendiquant eux aussi le centre avec le pion de e7 à e5." },
      { san: "Nf3", color: "w", from: "g1", to: "f3", comment: "Le cavalier se développe de g1 à f3, attaquant directement le pion e5." },
      { san: "Nc6", color: "b", from: "b8", to: "c6", comment: "Le cavalier noir vient de b8 à c6 pour défendre le pion e5." },
      { san: "Bc4", color: "w", from: "f1", to: "c4", comment: "Le fou blanc rejoint c4, visant la case f7 — le point le plus faible du camp noir en début de partie." },
      { san: "Bc5", color: "b", from: "f8", to: "c5", comment: "Les Noirs développent leur fou en miroir, de f8 à c5 : c'est ce coup qui donne son nom à l'Ouverture Italienne." },
      { san: "c3",  color: "w", from: "c2", to: "c3", comment: "Le pion avance en c3 pour préparer d2-d4 et bâtir un grand centre de pions." },
      { san: "Nf6", color: "b", from: "g8", to: "f6", comment: "Le cavalier noir se développe de g8 à f6, attaquant à son tour le pion e4." },
      { san: "d3",  color: "w", from: "d2", to: "d3", comment: "Un coup solide en d3 qui protège e4 sans encore s'engager sur d4." },
      { san: "d6",  color: "b", from: "d7", to: "d6", comment: "Les Noirs renforcent leur centre en d6 et ouvrent la diagonale de leur fou c8." },
      { san: "O-O", color: "w", from: "e1", to: "g1", castle: { rookFrom: "h1", rookTo: "f1" }, comment: "Petit roque : le roi blanc se met à l'abri en g1, la tour rejoint f1." },
      { san: "O-O", color: "b", from: "e8", to: "g8", castle: { rookFrom: "h8", rookTo: "f8" }, comment: "Les Noirs roquent à leur tour, leur roi trouve refuge en g8." },
      { san: "Re1", color: "w", from: "f1", to: "e1", comment: "La tour blanche vient occuper la colonne e depuis f1, en soutien du pion e4." },
      { san: "a6",  color: "b", from: "a7", to: "a6", comment: "Un coup utile en a6 qui empêche toute incursion future d'une pièce blanche en b5." },
      { san: "Bb3", color: "w", from: "c4", to: "b3", comment: "Le fou blanc se retire prudemment de c4 vers b3, hors de portée d'un futur ...Na5." },
      { san: "Ba7", color: "b", from: "c5", to: "a7", comment: "Le fou noir l'imite en reculant vers a7, tout en gardant sa diagonale active vers f2." }
    ]
  },

  "ruy-lopez": {
    name: "Ruy Lopez (partie espagnole)",
    eco: "C84",
    description: "L'ouverture la plus étudiée de l'histoire des échecs. Le fou blanc se déploie en b5 pour attaquer indirectement le cavalier qui défend le pion e5.",
    moves: [
      { san: "e4",  color: "w", from: "e2", to: "e4", comment: "Le pion roi avance de e2 à e4, prenant le centre dès le premier coup." },
      { san: "e5",  color: "b", from: "e7", to: "e5", comment: "Les Noirs répondent au centre de façon symétrique, de e7 à e5." },
      { san: "Nf3", color: "w", from: "g1", to: "f3", comment: "Le cavalier se développe en f3 et attaque le pion e5." },
      { san: "Nc6", color: "b", from: "b8", to: "c6", comment: "Le cavalier noir défend e5 en venant de b8 à c6." },
      { san: "Bb5", color: "w", from: "f1", to: "b5", comment: "Le fou blanc se rend en b5 : il attaque indirectement e5 en clouant le cavalier c6 sur le roi noir." },
      { san: "a6",  color: "b", from: "a7", to: "a6", comment: "Le coup de Morphy : les Noirs questionnent immédiatement le fou blanc depuis a6." },
      { san: "Ba4", color: "w", from: "b5", to: "a4", comment: "Le fou recule en a4, maintenant la pression sur le cavalier c6." },
      { san: "Nf6", color: "b", from: "g8", to: "f6", comment: "Les Noirs développent leur second cavalier en f6, contre-attaquant le pion e4." },
      { san: "O-O", color: "w", from: "e1", to: "g1", castle: { rookFrom: "h1", rookTo: "f1" }, comment: "Les Blancs roquent, mettant leur roi en sécurité en g1 avant de poursuivre le plan." },
      { san: "Be7", color: "b", from: "f8", to: "e7", comment: "Le fou noir se développe modestement en e7, préparant le roque." },
      { san: "Re1", color: "w", from: "f1", to: "e1", comment: "La tour vient soutenir le pion e4 depuis e1, anticipant l'échange à venir en c6." },
      { san: "b5",  color: "b", from: "b7", to: "b5", comment: "Les Noirs gagnent de l'espace à l'aile dame et chassent le fou de la diagonale a4-e8." },
      { san: "Bb3", color: "w", from: "a4", to: "b3", comment: "Le fou blanc se replie en b3, restant actif sur la diagonale a2-g8." },
      { san: "d6",  color: "b", from: "d7", to: "d6", comment: "Les Noirs consolident leur centre en d6 et libèrent le fou c8." },
      { san: "c3",  color: "w", from: "c2", to: "c3", comment: "Les Blancs jouent c3 pour préparer d2-d4 et construire un centre de pions imposant." },
      { san: "O-O", color: "b", from: "e8", to: "g8", castle: { rookFrom: "h8", rookTo: "f8" }, comment: "Les Noirs roquent enfin en g8, terminant leur développement dans la ligne principale fermée." }
    ]
  },

  sicilienne: {
    name: "Défense Sicilienne (Najdorf)",
    eco: "B90",
    description: "La réponse la plus combative à 1.e4. La variante Najdorf, avec le coup a6, est l'une des lignes les plus jouées au monde au plus haut niveau.",
    moves: [
      { san: "e4",   color: "w", from: "e2", to: "e4", comment: "Le pion roi avance de e2 à e4, luttant pour le centre dès le premier coup." },
      { san: "c5",   color: "b", from: "c7", to: "c5", comment: "La Défense Sicilienne : les Noirs contestent le centre depuis c5 de façon asymétrique, visant un jeu déséquilibré." },
      { san: "Nf3",  color: "w", from: "g1", to: "f3", comment: "Développement naturel du cavalier en f3, préparant d2-d4." },
      { san: "d6",   color: "b", from: "d7", to: "d6", comment: "Les Noirs jouent d6 pour préparer ...Nf6 sans craindre l'avance e4-e5." },
      { san: "d4",   color: "w", from: "d2", to: "d4", comment: "Les Blancs ouvrent le centre en poussant jusqu'en d4, offrant l'échange de pions." },
      { san: "cxd4", color: "b", from: "c5", to: "d4", capture: "d4", comment: "Les Noirs capturent en d4 avec leur pion c5, ouvrant la colonne c pour leur tour." },
      { san: "Nxd4", color: "w", from: "f3", to: "d4", capture: "d4", comment: "Le cavalier reprend en d4 : il est centralisé et prêt à se redéployer." },
      { san: "Nf6",  color: "b", from: "g8", to: "f6", comment: "Les Noirs développent leur cavalier en f6, attaquant le pion e4." },
      { san: "Nc3",  color: "w", from: "b1", to: "c3", comment: "Les Blancs protègent e4 en développant leur second cavalier en c3." },
      { san: "a6",   color: "b", from: "a7", to: "a6", comment: "La variante Najdorf : ce coup discret en a6 empêche Nb5 ou Bb5 et prépare ...e5 ou ...b5." },
      { san: "Be2",  color: "w", from: "f1", to: "e2", comment: "Un développement modeste et solide du fou vers e2, préparant le petit roque." },
      { san: "e5",   color: "b", from: "e7", to: "e5", comment: "Les Noirs gagnent de l'espace au centre en poussant jusqu'en e5, chassant le cavalier de d4." },
      { san: "Nb3",  color: "w", from: "d4", to: "b3", comment: "Le cavalier recule en b3 pour ne pas être chassé davantage, tout en surveillant les cases d4 et c5." },
      { san: "Be7",  color: "b", from: "f8", to: "e7", comment: "Les Noirs poursuivent leur développement en e7, en vue du roque." },
      { san: "O-O",  color: "w", from: "e1", to: "g1", castle: { rookFrom: "h1", rookTo: "f1" }, comment: "Les Blancs mettent leur roi à l'abri en g1." },
      { san: "O-O",  color: "b", from: "e8", to: "g8", castle: { rookFrom: "h8", rookTo: "f8" }, comment: "Les Noirs roquent à leur tour en g8 : la Najdorf classique est en place." }
    ]
  },

  "gambit-dame": {
    name: "Gambit Dame refusé",
    eco: "D50",
    description: "Une ouverture stratégique et classique : les Blancs proposent un pion pour prendre le contrôle du centre ; les Noirs déclinent et défendent solidement.",
    moves: [
      { san: "d4",   color: "w", from: "d2", to: "d4", comment: "Les Blancs prennent le centre par le pion dame, de d2 à d4." },
      { san: "d5",   color: "b", from: "d7", to: "d5", comment: "Les Noirs répondent symétriquement au centre avec d7-d5." },
      { san: "c4",   color: "w", from: "c2", to: "c4", comment: "Le Gambit Dame : les Blancs proposent le pion c4 pour attirer le pion d5 et dominer le centre." },
      { san: "e6",   color: "b", from: "e7", to: "e6", comment: "Les Noirs déclinent le gambit et renforcent d5 depuis e6, ouvrant la diagonale de leur fou f8." },
      { san: "Nc3",  color: "w", from: "b1", to: "c3", comment: "Développement naturel du cavalier en c3, qui met la pression sur d5." },
      { san: "Nf6",  color: "b", from: "g8", to: "f6", comment: "Les Noirs développent leur cavalier en f6, défendant d5 une nouvelle fois." },
      { san: "Bg5",  color: "w", from: "c1", to: "g5", comment: "Le fou sort en g5, clouant le cavalier f6 sur la dame noire." },
      { san: "Be7",  color: "b", from: "f8", to: "e7", comment: "Les Noirs développent leur fou en e7 pour préparer le roque et pouvoir casser le clouage." },
      { san: "e3",   color: "w", from: "e2", to: "e3", comment: "Un coup solide qui libère le fou f1 et soutient le centre blanc." },
      { san: "O-O",  color: "b", from: "e8", to: "g8", castle: { rookFrom: "h8", rookTo: "f8" }, comment: "Les Noirs roquent tôt, sécurisant leur roi en g8." },
      { san: "Nf3",  color: "w", from: "g1", to: "f3", comment: "Les Blancs complètent leur développement mineur en f3 avant de s'occuper du centre." },
      { san: "Nbd7", color: "b", from: "b8", to: "d7", comment: "Le second cavalier noir rejoint la mêlée en d7, préparant ...c6 et une éventuelle prise en c4." },
      { san: "Rc1",  color: "w", from: "a1", to: "c1", comment: "La tour se place sur la colonne semi-ouverte c, anticipant l'ouverture du jeu." },
      { san: "c6",   color: "b", from: "c7", to: "c6", comment: "Les Noirs renforcent d5 une dernière fois avant de chercher à se libérer." },
      { san: "Bd3",  color: "w", from: "f1", to: "d3", comment: "Le fou f1 se développe enfin vers d3, visant l'aile roi noire." },
      { san: "h6",   color: "b", from: "h7", to: "h6", comment: "Les Noirs questionnent le fou g5 depuis h6, le forçant à clarifier ses intentions." }
    ]
  },

  "caro-kann": {
    name: "Défense Caro-Kann",
    eco: "B18",
    description: "Une défense solide et durable face à 1.e4 : les Noirs soutiennent leur pion d5 sans enfermer leur fou des cases claires, contrairement à la Française.",
    moves: [
      { san: "e4",   color: "w", from: "e2", to: "e4", comment: "Le pion roi avance de e2 à e4, l'ouverture la plus classique pour prendre le centre." },
      { san: "c6",   color: "b", from: "c7", to: "c6", comment: "La Défense Caro-Kann : les Noirs préparent ...d5 tout en gardant la possibilité de soutenir ce pion avec leur dame ou leur fou." },
      { san: "d4",   color: "w", from: "d2", to: "d4", comment: "Les Blancs renforcent leur centre avec le second pion, de d2 à d4." },
      { san: "d5",   color: "b", from: "d7", to: "d5", comment: "Les Noirs contestent immédiatement le centre avec d7-d5, bien soutenu par le pion c6." },
      { san: "Nc3",  color: "w", from: "b1", to: "c3", comment: "Le cavalier se développe en c3, attaquant le pion d5." },
      { san: "dxe4", color: "b", from: "d5", to: "e4", capture: "e4", comment: "Les Noirs capturent en e4 : c'est la Variante Classique de la Caro-Kann." },
      { san: "Nxe4", color: "w", from: "c3", to: "e4", capture: "e4", comment: "Le cavalier reprend en e4, bien centralisé pour la suite." },
      { san: "Bf5",  color: "b", from: "c8", to: "f5", comment: "Coup clé de la Caro-Kann : le fou sort en f5 avant que le pion e6 ne l'enferme." },
      { san: "Ng3",  color: "w", from: "e4", to: "g3", comment: "Le cavalier blanc chasse le fou en venant attaquer f5 depuis g3." },
      { san: "Bg6",  color: "b", from: "f5", to: "g6", comment: "Le fou recule en g6, restant actif sur sa diagonale." },
      { san: "h4",   color: "w", from: "h2", to: "h4", comment: "Les Blancs poussent le pion h pour gagner encore plus de terrain contre le fou." },
      { san: "h6",   color: "b", from: "h7", to: "h6", comment: "Les Noirs jouent h6 pour empêcher h4-h5 de chasser à nouveau le fou avec gain de temps." },
      { san: "Nf3",  color: "w", from: "g1", to: "f3", comment: "Développement naturel du cavalier vers f3." },
      { san: "Nd7",  color: "b", from: "b8", to: "d7", comment: "Le cavalier noir se développe en d7, préparant ...Ngf6 et le petit roque." },
      { san: "h5",   color: "w", from: "h4", to: "h5", comment: "Les Blancs poussent quand même jusqu'en h5, repoussant le fou une dernière fois." },
      { san: "Bh7",  color: "b", from: "g6", to: "h7", comment: "Le fou se love en h7, sur sa dernière case sûre, terminant cette phase caractéristique de l'ouverture." }
    ]
  },

  francaise: {
    name: "Défense Française",
    eco: "C11",
    description: "Une ouverture solide et stratégique : les Noirs soutiennent d5 avec e6, au prix d'enfermer temporairement leur fou des cases claires.",
    moves: [
      { san: "e4",   color: "w", from: "e2", to: "e4", comment: "Le pion roi avance en e4, prenant le centre." },
      { san: "e6",   color: "b", from: "e7", to: "e6", comment: "La Défense Française : les Noirs préparent ...d5 en soutenant ce futur pion avec e6." },
      { san: "d4",   color: "w", from: "d2", to: "d4", comment: "Les Blancs complètent leur centre de pions." },
      { san: "d5",   color: "b", from: "d7", to: "d5", comment: "Les Noirs contestent directement le centre avec d7-d5." },
      { san: "Nc3",  color: "w", from: "b1", to: "c3", comment: "Le cavalier se développe en c3, maintenant la tension centrale sur e4." },
      { san: "Nf6",  color: "b", from: "g8", to: "f6", comment: "Les Noirs développent leur cavalier et attaquent le pion e4." },
      { san: "Bg5",  color: "w", from: "c1", to: "g5", comment: "Le fou blanc cloue le cavalier f6 sur la dame noire en sortant en g5." },
      { san: "Be7",  color: "b", from: "f8", to: "e7", comment: "Les Noirs développent leur fou en e7 pour pouvoir casser le clouage plus tard." },
      { san: "e5",   color: "w", from: "e4", to: "e5", comment: "Les Blancs poussent le pion en e5, gagnant de l'espace et chassant le cavalier f6." },
      { san: "Nfd7", color: "b", from: "f6", to: "d7", comment: "Le cavalier recule en d7 : c'est la Variante Classique (Steinitz) de la Française." },
      { san: "Bxe7", color: "w", from: "g5", to: "e7", capture: "e7", comment: "Les Blancs échangent leur fou contre le fou noir en e7." },
      { san: "Qxe7", color: "b", from: "d8", to: "e7", capture: "e7", comment: "La dame noire reprend en e7, bien placée pour la suite." },
      { san: "f4",   color: "w", from: "f2", to: "f4", comment: "Les Blancs renforcent leur chaîne de pions avec f4, préparant une attaque à l'aile roi." },
      { san: "O-O",  color: "b", from: "e8", to: "g8", castle: { rookFrom: "h8", rookTo: "f8" }, comment: "Les Noirs roquent, mettant leur roi à l'abri en g8." },
      { san: "Nf3",  color: "w", from: "g1", to: "f3", comment: "Développement naturel du cavalier en f3, complétant la mobilisation blanche." },
      { san: "c5",   color: "b", from: "c7", to: "c5", comment: "Les Noirs attaquent la base de la chaîne de pions blancs en jouant c7-c5." }
    ]
  },

  "est-indienne": {
    name: "Défense Est-Indienne",
    eco: "E90",
    description: "Les Noirs laissent les Blancs occuper tout le centre pour mieux le contester ensuite, avec un fianchetto de fou en g7 et la poussée thématique ...e5.",
    moves: [
      { san: "d4",   color: "w", from: "d2", to: "d4", comment: "Les Blancs prennent le centre avec le pion dame." },
      { san: "Nf6",  color: "b", from: "g8", to: "f6", comment: "Les Noirs développent leur cavalier, contrôlant e4 sans encore s'engager sur les pions centraux." },
      { san: "c4",   color: "w", from: "c2", to: "c4", comment: "Les Blancs élargissent leur emprise sur le centre avec c2-c4." },
      { san: "g6",   color: "b", from: "g7", to: "g6", comment: "La Défense Est-Indienne : les Noirs préparent un fianchetto de leur fou en g7." },
      { san: "Nc3",  color: "w", from: "b1", to: "c3", comment: "Développement naturel qui prépare e2-e4." },
      { san: "Bg7",  color: "b", from: "f8", to: "g7", comment: "Le fou noir prend position en g7, visant la grande diagonale a1-h8." },
      { san: "e4",   color: "w", from: "e2", to: "e4", comment: "Les Blancs occupent tout le centre avec leurs pions c4, d4 et e4." },
      { san: "d6",   color: "b", from: "d7", to: "d6", comment: "Les Noirs préparent le roque et soutiennent une future poussée ...e5." },
      { san: "Nf3",  color: "w", from: "g1", to: "f3", comment: "Le cavalier blanc se développe en f3, complétant la mobilisation." },
      { san: "O-O",  color: "b", from: "e8", to: "g8", castle: { rookFrom: "h8", rookTo: "f8" }, comment: "Les Noirs roquent tôt, mettant leur roi en sécurité avant de contester le centre." },
      { san: "Be2",  color: "w", from: "f1", to: "e2", comment: "Développement discret et solide du fou en e2." },
      { san: "e5",   color: "b", from: "e7", to: "e5", comment: "Les Noirs frappent enfin au centre avec e7-e5, le coup thématique de la Est-Indienne." },
      { san: "O-O",  color: "w", from: "e1", to: "g1", castle: { rookFrom: "h1", rookTo: "f1" }, comment: "Les Blancs roquent à leur tour." },
      { san: "Nc6",  color: "b", from: "b8", to: "c6", comment: "Le cavalier noir vient soutenir la tension centrale en c6." },
      { san: "d5",   color: "w", from: "d4", to: "d5", comment: "Les Blancs ferment le centre en poussant jusqu'en d5, fixant la structure typique de l'ouverture." },
      { san: "Ne7",  color: "b", from: "c6", to: "e7", comment: "Le cavalier se replie en e7, prêt à manœuvrer vers f5 ou g6 selon le plan choisi." }
    ]
  },

  anglaise: {
    name: "Ouverture Anglaise",
    eco: "A15",
    description: "Les Blancs contrôlent le centre depuis le flanc avec c4, menant souvent à des structures proches d'une Sicilienne inversée.",
    moves: [
      { san: "c4",   color: "w", from: "c2", to: "c4", comment: "L'Ouverture Anglaise : les Blancs contrôlent la case d5 depuis le flanc plutôt que d'occuper directement le centre." },
      { san: "e5",   color: "b", from: "e7", to: "e5", comment: "Les Noirs répondent en occupant le centre, créant une structure proche d'une Sicilienne inversée." },
      { san: "Nc3",  color: "w", from: "b1", to: "c3", comment: "Développement naturel qui renforce la pression sur d5." },
      { san: "Nf6",  color: "b", from: "g8", to: "f6", comment: "Les Noirs développent leur cavalier, surveillant le centre." },
      { san: "Nf3",  color: "w", from: "g1", to: "f3", comment: "Les Blancs développent leur second cavalier en attaquant le pion e5." },
      { san: "Nc6",  color: "b", from: "b8", to: "c6", comment: "Les Noirs défendent e5 en développant leur cavalier." },
      { san: "g3",   color: "w", from: "g2", to: "g3", comment: "Les Blancs préparent un fianchetto classique de leur fou en g2." },
      { san: "d5",   color: "b", from: "d7", to: "d5", comment: "Les Noirs prennent le centre avec d7-d5, profitant du fait que les Blancs n'ont pas encore joué d4." },
      { san: "cxd5", color: "w", from: "c4", to: "d5", capture: "d5", comment: "Les Blancs capturent en d5, ouvrant la colonne c." },
      { san: "Nxd5", color: "b", from: "f6", to: "d5", capture: "d5", comment: "Le cavalier noir reprend en d5, bien centralisé." },
      { san: "Bg2",  color: "w", from: "f1", to: "g2", comment: "Le fou blanc rejoint g2, complétant le fianchetto et visant la grande diagonale." },
      { san: "Nb6",  color: "b", from: "d5", to: "b6", comment: "Le cavalier noir recule en b6, hors de portée d'un futur gain de temps blanc." },
      { san: "O-O",  color: "w", from: "e1", to: "g1", castle: { rookFrom: "h1", rookTo: "f1" }, comment: "Les Blancs roquent, sécurisant leur roi." },
      { san: "Be7",  color: "b", from: "f8", to: "e7", comment: "Les Noirs développent leur fou en e7, préparant leur propre roque." },
      { san: "d3",   color: "w", from: "d2", to: "d3", comment: "Les Blancs consolident leur position avant de choisir un plan à l'aile dame ou au centre." },
      { san: "O-O",  color: "b", from: "e8", to: "g8", castle: { rookFrom: "h8", rookTo: "f8" }, comment: "Les Noirs roquent à leur tour, terminant leur développement dans cette structure équilibrée." }
    ]
  },

  scandinave: {
    name: "Défense Scandinave",
    eco: "B01",
    description: "Une réponse directe et provocatrice à 1.e4 : les Noirs capturent immédiatement au centre, quitte à exposer leur dame tôt dans la partie.",
    moves: [
      { san: "e4",   color: "w", from: "e2", to: "e4", comment: "Le pion roi avance en e4." },
      { san: "d5",   color: "b", from: "d7", to: "d5", comment: "La Défense Scandinave : les Noirs contestent immédiatement e4 par une attaque directe du pion." },
      { san: "exd5", color: "w", from: "e4", to: "d5", capture: "d5", comment: "Les Blancs capturent le pion d5." },
      { san: "Qxd5", color: "b", from: "d8", to: "d5", capture: "d5", comment: "La dame noire reprend en d5 dès le deuxième coup — un choix osé qui l'expose tôt dans la partie." },
      { san: "Nc3",  color: "w", from: "b1", to: "c3", comment: "Le cavalier blanc se développe en c3 tout en attaquant la dame noire, gagnant un temps précieux." },
      { san: "Qa5",  color: "b", from: "d5", to: "a5", comment: "La dame se replie en a5, hors de prise, tout en restant active." },
      { san: "d4",   color: "w", from: "d2", to: "d4", comment: "Les Blancs prennent un centre de pions confortable." },
      { san: "Nf6",  color: "b", from: "g8", to: "f6", comment: "Les Noirs développent leur cavalier, complétant leur mobilisation." },
      { san: "Nf3",  color: "w", from: "g1", to: "f3", comment: "Développement naturel du second cavalier blanc." },
      { san: "Bg4",  color: "b", from: "c8", to: "g4", comment: "Le fou noir cloue le cavalier f3 sur le roi blanc, préparant à échanger sur f3." },
      { san: "h3",   color: "w", from: "h2", to: "h3", comment: "Les Blancs questionnent immédiatement le fou en g4." },
      { san: "Bh5",  color: "b", from: "g4", to: "h5", comment: "Le fou recule en h5, maintenant le clouage." },
      { san: "g4",   color: "w", from: "g2", to: "g4", comment: "Les Blancs poussent encore, gagnant de l'espace et chassant le fou une seconde fois." },
      { san: "Bg6",  color: "b", from: "h5", to: "g6", comment: "Le fou se replie en g6, sa dernière case sûre sur cette diagonale." },
      { san: "Ne5",  color: "w", from: "f3", to: "e5", comment: "Le cavalier blanc saute en e5, attaquant directement le fou g6." },
      { san: "c6",   color: "b", from: "c7", to: "c6", comment: "Les Noirs jouent un coup utile en c6, tout en préparant ...Nbd7 pour soutenir leur position." }
    ]
  },

  "systeme-londres": {
    name: "Système Londres",
    eco: "D02",
    description: "Un dispositif blanc solide, flexible et facile à mémoriser, jouable contre presque toutes les défenses noires : Bf4, e3, Bd3, c3, Nbd2.",
    moves: [
      { san: "d4",   color: "w", from: "d2", to: "d4", comment: "Les Blancs prennent le centre avec le pion dame, première pierre du Système Londres." },
      { san: "d5",   color: "b", from: "d7", to: "d5", comment: "Les Noirs répondent symétriquement au centre." },
      { san: "Nf3",  color: "w", from: "g1", to: "f3", comment: "Développement naturel du cavalier, préparant le déploiement caractéristique du fou." },
      { san: "Nf6",  color: "b", from: "g8", to: "f6", comment: "Les Noirs développent également leur cavalier." },
      { san: "Bf4",  color: "w", from: "c1", to: "f4", comment: "Coup signature du Système Londres : le fou sort en f4 avant que le pion e3 ne l'enferme." },
      { san: "e6",   color: "b", from: "e7", to: "e6", comment: "Les Noirs préparent le développement de leur propre fou et consolident d5." },
      { san: "e3",   color: "w", from: "e2", to: "e3", comment: "Les Blancs soutiennent leur centre tout en gardant une structure très solide." },
      { san: "Bd6",  color: "b", from: "f8", to: "d6", comment: "Les Noirs développent leur fou en d6, proposant même un échange contre le fou actif en f4." },
      { san: "Bg3",  color: "w", from: "f4", to: "g3", comment: "Les Blancs évitent l'échange en reculant leur fou en g3, préservant la paire de fous." },
      { san: "O-O",  color: "b", from: "e8", to: "g8", castle: { rookFrom: "h8", rookTo: "f8" }, comment: "Les Noirs roquent, mettant leur roi à l'abri." },
      { san: "Bd3",  color: "w", from: "f1", to: "d3", comment: "Le fou f1 rejoint d3, visant l'aile roi noire." },
      { san: "c5",   color: "b", from: "c7", to: "c5", comment: "Les Noirs contestent le centre blanc en jouant c7-c5." },
      { san: "c3",   color: "w", from: "c2", to: "c3", comment: "Les Blancs renforcent leur centre avec un coup solide et flexible." },
      { san: "Nc6",  color: "b", from: "b8", to: "c6", comment: "Les Noirs développent leur second cavalier, augmentant la pression sur d4." },
      { san: "Nbd2", color: "w", from: "b1", to: "d2", comment: "Le second cavalier blanc se développe en d2, complétant un dispositif harmonieux typique du Système Londres." },
      { san: "Qe7",  color: "b", from: "d8", to: "e7", comment: "Les Noirs placent leur dame en e7, préparant ...e5 ou ...Rd8 selon le plan choisi." }
    ]
  },

  ecossaise: {
    name: "Partie Écossaise",
    eco: "C45",
    description: "Les Blancs ouvrent le centre dès le troisième coup plutôt que de développer leur fou en c4, menant à un jeu ouvert et dynamique.",
    moves: [
      { san: "e4",   color: "w", from: "e2", to: "e4", comment: "Le pion roi avance en e4." },
      { san: "e5",   color: "b", from: "e7", to: "e5", comment: "Les Noirs répondent symétriquement au centre." },
      { san: "Nf3",  color: "w", from: "g1", to: "f3", comment: "Le cavalier attaque directement le pion e5." },
      { san: "Nc6",  color: "b", from: "b8", to: "c6", comment: "Les Noirs défendent leur pion en développant leur cavalier." },
      { san: "d4",   color: "w", from: "d2", to: "d4", comment: "La Partie Écossaise : les Blancs ouvrent immédiatement le centre plutôt que de développer leur fou en c4." },
      { san: "exd4", color: "b", from: "e5", to: "d4", capture: "d4", comment: "Les Noirs capturent le pion d4 offert." },
      { san: "Nxd4", color: "w", from: "f3", to: "d4", capture: "d4", comment: "Le cavalier reprend en d4, très centralisé." },
      { san: "Nf6",  color: "b", from: "g8", to: "f6", comment: "Les Noirs développent leur second cavalier, attaquant le pion e4." },
      { san: "Nc3",  color: "w", from: "b1", to: "c3", comment: "Les Blancs protègent e4 en développant leur second cavalier." },
      { san: "Bb4",  color: "b", from: "f8", to: "b4", comment: "Le fou noir cloue le cavalier c3 sur le roi blanc." },
      { san: "Nxc6", color: "w", from: "d4", to: "c6", capture: "c6", comment: "Les Blancs échangent leur cavalier centralisé contre celui de c6." },
      { san: "bxc6", color: "b", from: "b7", to: "c6", capture: "c6", comment: "Les Noirs reprennent avec le pion b, obtenant la paire de fous malgré des pions doublés." },
      { san: "Bd3",  color: "w", from: "f1", to: "d3", comment: "Le fou blanc se développe en d3, visant l'aile roi noire." },
      { san: "d5",   color: "b", from: "d7", to: "d5", comment: "Les Noirs frappent au centre avec d7-d5, profitant de leur avance de développement." },
      { san: "exd5", color: "w", from: "e4", to: "d5", capture: "d5", comment: "Les Blancs capturent en d5." },
      { san: "cxd5", color: "b", from: "c6", to: "d5", capture: "d5", comment: "Les Noirs reprennent avec le pion c, obtenant une structure centrale solide et une position équilibrée." }
    ]
  },

  viennoise: {
    name: "Départ Viennois",
    eco: "C26",
    description: "Les Blancs développent leur cavalier en c3 avant de décider du sort de leur pion f, gardant plusieurs plans possibles (gambit ou jeu positionnel).",
    moves: [
      { san: "e4",   color: "w", from: "e2", to: "e4", comment: "Le pion roi avance en e4." },
      { san: "e5",   color: "b", from: "e7", to: "e5", comment: "Les Noirs occupent également le centre." },
      { san: "Nc3",  color: "w", from: "b1", to: "c3", comment: "Le Départ Viennois : les Blancs développent leur cavalier avant de décider du sort de leur pion f." },
      { san: "Nf6",  color: "b", from: "g8", to: "f6", comment: "Les Noirs développent leur cavalier, attaquant le pion e4." },
      { san: "g3",   color: "w", from: "g2", to: "g3", comment: "Les Blancs choisissent un plan positionnel avec un fianchetto plutôt que le Gambit Viennois." },
      { san: "d5",   color: "b", from: "d7", to: "d5", comment: "Les Noirs frappent immédiatement au centre, profitant du léger retard de développement blanc." },
      { san: "exd5", color: "w", from: "e4", to: "d5", capture: "d5", comment: "Les Blancs capturent le pion central." },
      { san: "Nxd5", color: "b", from: "f6", to: "d5", capture: "d5", comment: "Le cavalier noir reprend, bien centralisé." },
      { san: "Bg2",  color: "w", from: "f1", to: "g2", comment: "Le fou rejoint g2, complétant le fianchetto." },
      { san: "Nb6",  color: "b", from: "d5", to: "b6", comment: "Le cavalier recule en b6, hors de portée d'un futur gain de temps." },
      { san: "Nge2", color: "w", from: "g1", to: "e2", comment: "Le second cavalier blanc se développe en e2, laissant la case f3 libre pour le fou." },
      { san: "Nc6",  color: "b", from: "b8", to: "c6", comment: "Les Noirs développent leur second cavalier." },
      { san: "O-O",  color: "w", from: "e1", to: "g1", castle: { rookFrom: "h1", rookTo: "f1" }, comment: "Les Blancs roquent, mettant leur roi à l'abri." },
      { san: "Be7",  color: "b", from: "f8", to: "e7", comment: "Les Noirs développent leur fou, préparant leur propre roque." },
      { san: "d3",   color: "w", from: "d2", to: "d3", comment: "Les Blancs consolident leur position centrale." },
      { san: "O-O",  color: "b", from: "e8", to: "g8", castle: { rookFrom: "h8", rookTo: "f8" }, comment: "Les Noirs roquent à leur tour, terminant leur développement." }
    ]
  },

  petrov: {
    name: "Défense Petrov",
    eco: "C42",
    description: "Aussi appelée Partie Russe : au lieu de défendre leur pion e5, les Noirs contre-attaquent immédiatement le pion e4 adverse.",
    moves: [
      { san: "e4",   color: "w", from: "e2", to: "e4", comment: "Le pion roi avance en e4." },
      { san: "e5",   color: "b", from: "e7", to: "e5", comment: "Les Noirs répondent symétriquement." },
      { san: "Nf3",  color: "w", from: "g1", to: "f3", comment: "Le cavalier attaque le pion e5." },
      { san: "Nf6",  color: "b", from: "g8", to: "f6", comment: "La Défense Petrov : au lieu de défendre e5, les Noirs contre-attaquent directement le pion e4." },
      { san: "Nxe5", color: "w", from: "f3", to: "e5", capture: "e5", comment: "Les Blancs capturent le pion e5 offert." },
      { san: "d6",   color: "b", from: "d7", to: "d6", comment: "Les Noirs chassent le cavalier avant de reprendre sur e4." },
      { san: "Nf3",  color: "w", from: "e5", to: "f3", comment: "Le cavalier recule prudemment en f3." },
      { san: "Nxe4", color: "b", from: "f6", to: "e4", capture: "e4", comment: "Les Noirs reprennent enfin sur e4, rétablissant l'équilibre matériel." },
      { san: "d4",   color: "w", from: "d2", to: "d4", comment: "Les Blancs prennent un centre de pions plus large." },
      { san: "d5",   color: "b", from: "d6", to: "d5", comment: "Les Noirs soutiennent solidement leur cavalier avancé." },
      { san: "Bd3",  color: "w", from: "f1", to: "d3", comment: "Le fou blanc se développe en visant le cavalier e4." },
      { san: "Nc6",  color: "b", from: "b8", to: "c6", comment: "Les Noirs développent leur second cavalier." },
      { san: "O-O",  color: "w", from: "e1", to: "g1", castle: { rookFrom: "h1", rookTo: "f1" }, comment: "Les Blancs roquent, mettant leur roi en sécurité." },
      { san: "Be7",  color: "b", from: "f8", to: "e7", comment: "Les Noirs développent leur fou, préparant le roque." },
      { san: "c4",   color: "w", from: "c2", to: "c4", comment: "Les Blancs augmentent la pression sur le centre noir." },
      { san: "Nb4",  color: "b", from: "c6", to: "b4", comment: "Le cavalier noir vient attaquer le fou d3, gagnant un temps." }
    ]
  },

  slave: {
    name: "Défense Slave",
    eco: "D17",
    description: "Face au Gambit Dame, les Noirs soutiennent leur pion d5 avec c6 plutôt qu'avec e6, gardant ainsi leur fou des cases claires libre de se développer.",
    moves: [
      { san: "d4",   color: "w", from: "d2", to: "d4", comment: "Les Blancs prennent le centre." },
      { san: "d5",   color: "b", from: "d7", to: "d5", comment: "Les Noirs répondent symétriquement." },
      { san: "c4",   color: "w", from: "c2", to: "c4", comment: "Le Gambit Dame est proposé." },
      { san: "c6",   color: "b", from: "c7", to: "c6", comment: "La Défense Slave : les Noirs soutiennent d5 avec le pion c, gardant leur fou c8 libre de se développer." },
      { san: "Nf3",  color: "w", from: "g1", to: "f3", comment: "Développement naturel du cavalier." },
      { san: "Nf6",  color: "b", from: "g8", to: "f6", comment: "Les Noirs développent également leur cavalier." },
      { san: "Nc3",  color: "w", from: "b1", to: "c3", comment: "Le second cavalier blanc se développe, augmentant la pression sur d5." },
      { san: "dxc4", color: "b", from: "d5", to: "c4", capture: "c4", comment: "Les Noirs capturent le pion c4, acceptant temporairement le gambit." },
      { san: "a4",   color: "w", from: "a2", to: "a4", comment: "Les Blancs empêchent ...b5, qui aurait défendu solidement le pion supplémentaire." },
      { san: "Bf5",  color: "b", from: "c8", to: "f5", comment: "Les Noirs développent leur fou en f5 avant de jouer ...e6, le gardant actif." },
      { san: "e3",   color: "w", from: "e2", to: "e3", comment: "Les Blancs préparent de récupérer leur pion via Bxc4." },
      { san: "e6",   color: "b", from: "e7", to: "e6", comment: "Les Noirs complètent leur développement en préparant leur propre fou f8." },
      { san: "Bxc4", color: "w", from: "f1", to: "c4", capture: "c4", comment: "Les Blancs récupèrent leur pion, avec une position agréable et bien développée." },
      { san: "Bb4",  color: "b", from: "f8", to: "b4", comment: "Les Noirs clouent le cavalier c3 sur le roi blanc." },
      { san: "O-O",  color: "w", from: "e1", to: "g1", castle: { rookFrom: "h1", rookTo: "f1" }, comment: "Les Blancs roquent, mettant leur roi à l'abri." },
      { san: "O-O",  color: "b", from: "e8", to: "g8", castle: { rookFrom: "h8", rookTo: "f8" }, comment: "Les Noirs roquent à leur tour, terminant leur développement dans une position équilibrée." }
    ]
  },

  grunfeld: {
    name: "Défense Grünfeld",
    eco: "D85",
    description: "Les Noirs laissent les Blancs bâtir un grand centre de pions pour mieux l'attaquer ensuite depuis les flancs, fou fianchetto en tête.",
    moves: [
      { san: "d4",   color: "w", from: "d2", to: "d4", comment: "Les Blancs prennent le centre." },
      { san: "Nf6",  color: "b", from: "g8", to: "f6", comment: "Les Noirs développent leur cavalier sans encore s'engager sur les pions centraux." },
      { san: "c4",   color: "w", from: "c2", to: "c4", comment: "Les Blancs élargissent leur emprise sur le centre." },
      { san: "g6",   color: "b", from: "g7", to: "g6", comment: "La Défense Grünfeld : les Noirs préparent un fianchetto tout en visant à attaquer le centre blanc plus tard avec ...d5." },
      { san: "Nc3",  color: "w", from: "b1", to: "c3", comment: "Développement naturel du cavalier." },
      { san: "d5",   color: "b", from: "d7", to: "d5", comment: "Les Noirs frappent immédiatement au centre, le coup thématique de la Grünfeld." },
      { san: "cxd5", color: "w", from: "c4", to: "d5", capture: "d5", comment: "Les Blancs capturent le pion d5." },
      { san: "Nxd5", color: "b", from: "f6", to: "d5", capture: "d5", comment: "Le cavalier noir reprend, bien centralisé mais bientôt sujet à être chassé." },
      { san: "e4",   color: "w", from: "e2", to: "e4", comment: "Les Blancs occupent un centre de pions imposant en chassant le cavalier." },
      { san: "Nxc3", color: "b", from: "d5", to: "c3", capture: "c3", comment: "Les Noirs échangent leur cavalier contre celui de c3, abîmant la structure de pions blanche." },
      { san: "bxc3", color: "w", from: "b2", to: "c3", capture: "c3", comment: "Les Blancs reprennent avec le pion b, obtenant un grand centre mais une structure légèrement affaiblie." },
      { san: "Bg7",  color: "b", from: "f8", to: "g7", comment: "Le fou noir complète le fianchetto, visant directement ce centre blanc." },
      { san: "Bc4",  color: "w", from: "f1", to: "c4", comment: "Les Blancs développent leur fou de façon active, visant f7." },
      { san: "c5",   color: "b", from: "c7", to: "c5", comment: "Les Noirs attaquent immédiatement le centre blanc élargi." },
      { san: "Ne2",  color: "w", from: "g1", to: "e2", comment: "Les Blancs développent leur cavalier en e2, gardant f3 libre pour une éventuelle poussée f2-f4." },
      { san: "Nc6",  color: "b", from: "b8", to: "c6", comment: "Les Noirs développent leur second cavalier, augmentant la pression sur d4." }
    ]
  },

  pirc: {
    name: "Défense Pirc",
    eco: "B07",
    description: "Une défense hypermoderne et flexible : les Noirs laissent les Blancs occuper le centre avant de le contester avec un fianchetto et ...e5.",
    moves: [
      { san: "e4",   color: "w", from: "e2", to: "e4", comment: "Le pion roi avance en e4." },
      { san: "d6",   color: "b", from: "d7", to: "d6", comment: "La Défense Pirc : les Noirs préparent un développement flexible avec un futur fianchetto, sans occuper immédiatement le centre." },
      { san: "d4",   color: "w", from: "d2", to: "d4", comment: "Les Blancs prennent un large centre de pions." },
      { san: "Nf6",  color: "b", from: "g8", to: "f6", comment: "Les Noirs développent leur cavalier, attaquant le pion e4." },
      { san: "Nc3",  color: "w", from: "b1", to: "c3", comment: "Les Blancs protègent leur pion e4 en développant leur cavalier." },
      { san: "g6",   color: "b", from: "g7", to: "g6", comment: "Les Noirs préparent le fianchetto caractéristique de cette défense." },
      { san: "Nf3",  color: "w", from: "g1", to: "f3", comment: "Développement naturel du second cavalier blanc." },
      { san: "Bg7",  color: "b", from: "f8", to: "g7", comment: "Le fou noir prend position en g7, visant la grande diagonale." },
      { san: "Be2",  color: "w", from: "f1", to: "e2", comment: "Développement discret et solide du fou blanc." },
      { san: "O-O",  color: "b", from: "e8", to: "g8", castle: { rookFrom: "h8", rookTo: "f8" }, comment: "Les Noirs roquent, mettant leur roi à l'abri avant de contester le centre." },
      { san: "O-O",  color: "w", from: "e1", to: "g1", castle: { rookFrom: "h1", rookTo: "f1" }, comment: "Les Blancs roquent à leur tour." },
      { san: "e5",   color: "b", from: "e7", to: "e5", comment: "Les Noirs contestent enfin le centre avec e7-e5." },
      { san: "dxe5", color: "w", from: "d4", to: "e5", capture: "e5", comment: "Les Blancs capturent au centre." },
      { san: "dxe5", color: "b", from: "d6", to: "e5", capture: "e5", comment: "Les Noirs reprennent, ouvrant la colonne d." },
      { san: "Qxd8", color: "w", from: "d1", to: "d8", capture: "d8", comment: "Les Blancs proposent l'échange des dames, menant à une finale légèrement plus confortable." },
      { san: "Rxd8", color: "b", from: "f8", to: "d8", capture: "d8", comment: "Les Noirs reprennent avec leur tour ; la partie entre dans une phase de finale précoce typique de cette ligne." }
    ]
  },

  "nimzo-indienne": {
    name: "Défense Nimzo-Indienne",
    eco: "E40",
    description: "Une des défenses les plus respectées contre 1.d4 : le fou noir cloue immédiatement le cavalier c3 sur le roi blanc, empêchant e2-e4.",
    moves: [
      { san: "d4",   color: "w", from: "d2", to: "d4", comment: "Les Blancs prennent le centre." },
      { san: "Nf6",  color: "b", from: "g8", to: "f6", comment: "Les Noirs développent leur cavalier sans encore s'engager." },
      { san: "c4",   color: "w", from: "c2", to: "c4", comment: "Les Blancs élargissent leur emprise sur le centre." },
      { san: "e6",   color: "b", from: "e7", to: "e6", comment: "Les Noirs préparent ...Bb4, le coup caractéristique de la Nimzo-Indienne." },
      { san: "Nc3",  color: "w", from: "b1", to: "c3", comment: "Développement naturel du cavalier." },
      { san: "Bb4",  color: "b", from: "f8", to: "b4", comment: "La Nimzo-Indienne : le fou noir cloue le cavalier c3 sur le roi blanc, empêchant e2-e4." },
      { san: "e3",   color: "w", from: "e2", to: "e3", comment: "La Variante Rubinstein : les Blancs préparent de développer leur fou f1 avant de s'occuper du clouage." },
      { san: "O-O",  color: "b", from: "e8", to: "g8", castle: { rookFrom: "h8", rookTo: "f8" }, comment: "Les Noirs roquent, mettant leur roi à l'abri." },
      { san: "Bd3",  color: "w", from: "f1", to: "d3", comment: "Le fou blanc se développe activement, visant l'aile roi noire." },
      { san: "d5",   color: "b", from: "d7", to: "d5", comment: "Les Noirs contestent le centre avec d7-d5." },
      { san: "Nf3",  color: "w", from: "g1", to: "f3", comment: "Développement naturel du second cavalier." },
      { san: "c5",   color: "b", from: "c7", to: "c5", comment: "Les Noirs attaquent le centre blanc depuis le flanc." },
      { san: "O-O",  color: "w", from: "e1", to: "g1", castle: { rookFrom: "h1", rookTo: "f1" }, comment: "Les Blancs roquent à leur tour." },
      { san: "Nc6",  color: "b", from: "b8", to: "c6", comment: "Les Noirs développent leur second cavalier, augmentant la pression sur d4." },
      { san: "a3",   color: "w", from: "a2", to: "a3", comment: "Les Blancs posent la question au fou : il doit se décider." },
      { san: "Bxc3", color: "b", from: "b4", to: "c3", capture: "c3", comment: "Les Noirs échangent leur fou contre le cavalier c3, abîmant la structure de pions blanche en échange de la paire de fous adverse." }
    ]
  },

  "gambit-dame-accepte": {
    name: "Gambit Dame Accepté",
    eco: "D20",
    description: "Les Noirs acceptent le pion offert en c4, comptant le rendre plus tard ou profiter d'un temps de développement supplémentaire.",
    moves: [
      { san: "d4",   color: "w", from: "d2", to: "d4", comment: "Les Blancs prennent le centre." },
      { san: "d5",   color: "b", from: "d7", to: "d5", comment: "Les Noirs répondent symétriquement." },
      { san: "c4",   color: "w", from: "c2", to: "c4", comment: "Le Gambit Dame est proposé." },
      { san: "dxc4", color: "b", from: "d5", to: "c4", capture: "c4", comment: "Le Gambit Dame Accepté : les Noirs prennent le pion, comptant le rendre plus tard ou le garder temporairement." },
      { san: "Nf3",  color: "w", from: "g1", to: "f3", comment: "Développement naturel plutôt que de se précipiter pour reprendre le pion." },
      { san: "Nf6",  color: "b", from: "g8", to: "f6", comment: "Les Noirs développent également leur cavalier." },
      { san: "e3",   color: "w", from: "e2", to: "e3", comment: "Les Blancs préparent Bxc4 pour récupérer leur pion." },
      { san: "e6",   color: "b", from: "e7", to: "e6", comment: "Les Noirs complètent leur développement." },
      { san: "Bxc4", color: "w", from: "f1", to: "c4", capture: "c4", comment: "Les Blancs récupèrent leur pion tout en développant activement leur fou." },
      { san: "c5",   color: "b", from: "c7", to: "c5", comment: "Les Noirs contestent immédiatement le centre blanc." },
      { san: "O-O",  color: "w", from: "e1", to: "g1", castle: { rookFrom: "h1", rookTo: "f1" }, comment: "Les Blancs roquent, mettant leur roi à l'abri." },
      { san: "a6",   color: "b", from: "a7", to: "a6", comment: "Les Noirs préparent ...b5 pour gagner de l'espace à l'aile dame." },
      { san: "Qe2",  color: "w", from: "d1", to: "e2", comment: "Les Blancs préparent Rd1 et gardent un œil sur l'aile dame noire." },
      { san: "b5",   color: "b", from: "b7", to: "b5", comment: "Les Noirs gagnent de l'espace et chassent le fou de c4." },
      { san: "Bb3",  color: "w", from: "c4", to: "b3", comment: "Le fou blanc se replie en b3, restant actif sur la diagonale." },
      { san: "Bb7",  color: "b", from: "c8", to: "b7", comment: "Les Noirs développent leur fou en b7, visant la grande diagonale." }
    ]
  },

  "benoni-moderne": {
    name: "Benoni Moderne",
    eco: "A60",
    description: "Les Noirs cèdent de l'espace au centre en échange d'un jeu dynamique et déséquilibré, avec une majorité de pions à l'aile dame.",
    moves: [
      { san: "d4",   color: "w", from: "d2", to: "d4", comment: "Les Blancs prennent le centre." },
      { san: "Nf6",  color: "b", from: "g8", to: "f6", comment: "Les Noirs développent leur cavalier." },
      { san: "c4",   color: "w", from: "c2", to: "c4", comment: "Les Blancs élargissent leur emprise sur le centre." },
      { san: "c5",   color: "b", from: "c7", to: "c5", comment: "Les Noirs contestent immédiatement le centre depuis le flanc dame." },
      { san: "d5",   color: "w", from: "d4", to: "d5", comment: "Le Benoni Moderne : les Blancs poussent leur pion en avant, gagnant de l'espace." },
      { san: "e6",   color: "b", from: "e7", to: "e6", comment: "Les Noirs attaquent immédiatement ce pion avancé." },
      { san: "Nc3",  color: "w", from: "b1", to: "c3", comment: "Les Blancs développent leur cavalier avant de résoudre la tension centrale." },
      { san: "exd5", color: "b", from: "e6", to: "d5", capture: "d5", comment: "Les Noirs capturent en d5." },
      { san: "cxd5", color: "w", from: "c4", to: "d5", capture: "d5", comment: "Les Blancs reprennent, obtenant un pion passé avancé et beaucoup d'espace." },
      { san: "d6",   color: "b", from: "d7", to: "d6", comment: "Les Noirs préparent leur fianchetto et solidifient leur structure." },
      { san: "e4",   color: "w", from: "e2", to: "e4", comment: "Les Blancs occupent un centre imposant." },
      { san: "g6",   color: "b", from: "g7", to: "g6", comment: "Les Noirs préparent le fianchetto caractéristique du Benoni." },
      { san: "Nf3",  color: "w", from: "g1", to: "f3", comment: "Développement naturel du second cavalier." },
      { san: "Bg7",  color: "b", from: "f8", to: "g7", comment: "Le fou noir prend position en g7, visant directement le centre blanc." },
      { san: "Be2",  color: "w", from: "f1", to: "e2", comment: "Développement discret et solide du fou." },
      { san: "O-O",  color: "b", from: "e8", to: "g8", castle: { rookFrom: "h8", rookTo: "f8" }, comment: "Les Noirs roquent, mettant leur roi à l'abri avant de manœuvrer contre le centre blanc." }
    ]
  },

  catalane: {
    name: "Ouverture Catalane",
    eco: "E01",
    description: "Les Blancs combinent les idées du Gambit Dame et d'un fianchetto de fou en g2, exerçant une pression durable sur toute la diagonale a1-h8.",
    moves: [
      { san: "d4",   color: "w", from: "d2", to: "d4", comment: "Les Blancs prennent le centre." },
      { san: "Nf6",  color: "b", from: "g8", to: "f6", comment: "Les Noirs développent leur cavalier." },
      { san: "c4",   color: "w", from: "c2", to: "c4", comment: "Les Blancs élargissent leur emprise sur le centre." },
      { san: "e6",   color: "b", from: "e7", to: "e6", comment: "Les Noirs préparent ...d5 en gardant leur structure flexible." },
      { san: "g3",   color: "w", from: "g2", to: "g3", comment: "L'Ouverture Catalane : les Blancs préparent un fianchetto qui visera directement le centre et l'aile dame noirs." },
      { san: "d5",   color: "b", from: "d7", to: "d5", comment: "Les Noirs occupent le centre." },
      { san: "Bg2",  color: "w", from: "f1", to: "g2", comment: "Le fou blanc complète le fianchetto, pièce maîtresse de tout le système catalan." },
      { san: "Be7",  color: "b", from: "f8", to: "e7", comment: "Les Noirs développent modestement leur fou, préparant le roque." },
      { san: "Nf3",  color: "w", from: "g1", to: "f3", comment: "Développement naturel du cavalier." },
      { san: "O-O",  color: "b", from: "e8", to: "g8", castle: { rookFrom: "h8", rookTo: "f8" }, comment: "Les Noirs roquent, mettant leur roi à l'abri." },
      { san: "O-O",  color: "w", from: "e1", to: "g1", castle: { rookFrom: "h1", rookTo: "f1" }, comment: "Les Blancs roquent à leur tour." },
      { san: "dxc4", color: "b", from: "d5", to: "c4", capture: "c4", comment: "Le Catalan Ouvert : les Noirs capturent le pion c4, cédant le centre mais gagnant un temps de développement." },
      { san: "Qc2",  color: "w", from: "d1", to: "c2", comment: "Les Blancs préparent de récupérer leur pion sans perdre de temps." },
      { san: "a6",   color: "b", from: "a7", to: "a6", comment: "Les Noirs préparent ...b5 pour défendre solidement leur pion supplémentaire." },
      { san: "Qxc4", color: "w", from: "c2", to: "c4", capture: "c4", comment: "Les Blancs récupèrent leur pion, avec une pression durable sur l'aile dame noire grâce au fou de g2." },
      { san: "b5",   color: "b", from: "b7", to: "b5", comment: "Les Noirs gagnent de l'espace et chassent la dame, préparant ...Bb7." }
    ]
  },

  alekhine: {
    name: "Défense Alekhine",
    eco: "B04",
    description: "Une provocation dès le premier coup : les Noirs laissent les Blancs avancer leurs pions centraux pour mieux les attaquer ensuite.",
    moves: [
      { san: "e4",   color: "w", from: "e2", to: "e4", comment: "Le pion roi avance en e4." },
      { san: "Nf6",  color: "b", from: "g8", to: "f6", comment: "La Défense Alekhine : les Noirs provoquent immédiatement le pion e4 à avancer, comptant l'attaquer plus tard." },
      { san: "e5",   color: "w", from: "e4", to: "e5", comment: "Les Blancs acceptent de gagner de l'espace en chassant le cavalier." },
      { san: "Nd5",  color: "b", from: "f6", to: "d5", comment: "Le cavalier noir recule mais reste actif au centre." },
      { san: "d4",   color: "w", from: "d2", to: "d4", comment: "Les Blancs construisent un large centre de pions." },
      { san: "d6",   color: "b", from: "d7", to: "d6", comment: "Les Noirs commencent immédiatement à attaquer ce centre étendu." },
      { san: "Nf3",  color: "w", from: "g1", to: "f3", comment: "Développement naturel du cavalier." },
      { san: "g6",   color: "b", from: "g7", to: "g6", comment: "Les Noirs préparent un fianchetto pour faire pression sur le centre blanc à distance." },
      { san: "Bc4",  color: "w", from: "f1", to: "c4", comment: "Le fou blanc se développe activement, visant le cavalier d5 et la case f7." },
      { san: "Nb6",  color: "b", from: "d5", to: "b6", comment: "Le cavalier noir recule en b6, hors de portée du fou." },
      { san: "Bb3",  color: "w", from: "c4", to: "b3", comment: "Le fou se replie en b3, restant actif sur la diagonale." },
      { san: "Bg7",  color: "b", from: "f8", to: "g7", comment: "Le fou noir complète son fianchetto, visant directement le centre blanc." },
      { san: "a4",   color: "w", from: "a2", to: "a4", comment: "Les Blancs gagnent de l'espace à l'aile dame et menacent a4-a5." },
      { san: "a5",   color: "b", from: "a7", to: "a5", comment: "Les Noirs stoppent net cette avance." },
      { san: "O-O",  color: "w", from: "e1", to: "g1", castle: { rookFrom: "h1", rookTo: "f1" }, comment: "Les Blancs roquent, mettant leur roi à l'abri." },
      { san: "O-O",  color: "b", from: "e8", to: "g8", castle: { rookFrom: "h8", rookTo: "f8" }, comment: "Les Noirs roquent à leur tour, prêts à continuer d'attaquer le centre blanc." }
    ]
  },

  hollandaise: {
    name: "Défense Hollandaise",
    eco: "A81",
    description: "Une défense agressive et peu commune : les Noirs contrôlent la case e4 depuis le flanc avec ...f5, au prix d'affaiblir légèrement leur roi.",
    moves: [
      { san: "d4",   color: "w", from: "d2", to: "d4", comment: "Les Blancs prennent le centre." },
      { san: "f5",   color: "b", from: "f7", to: "f5", comment: "La Défense Hollandaise : les Noirs contrôlent la case e4 depuis le flanc, au prix d'affaiblir légèrement leur roi." },
      { san: "g3",   color: "w", from: "g2", to: "g3", comment: "Les Blancs préparent un fianchetto classique." },
      { san: "Nf6",  color: "b", from: "g8", to: "f6", comment: "Les Noirs développent leur cavalier." },
      { san: "Bg2",  color: "w", from: "f1", to: "g2", comment: "Le fou blanc complète le fianchetto." },
      { san: "g6",   color: "b", from: "g7", to: "g6", comment: "La Variante Leningrad : les Noirs préparent leur propre fianchetto, combinant les idées de la Hollandaise et de l'Est-Indienne." },
      { san: "Nf3",  color: "w", from: "g1", to: "f3", comment: "Développement naturel du cavalier." },
      { san: "Bg7",  color: "b", from: "f8", to: "g7", comment: "Le fou noir prend position en g7." },
      { san: "O-O",  color: "w", from: "e1", to: "g1", castle: { rookFrom: "h1", rookTo: "f1" }, comment: "Les Blancs roquent, mettant leur roi à l'abri." },
      { san: "O-O",  color: "b", from: "e8", to: "g8", castle: { rookFrom: "h8", rookTo: "f8" }, comment: "Les Noirs roquent à leur tour." },
      { san: "c4",   color: "w", from: "c2", to: "c4", comment: "Les Blancs élargissent leur emprise sur le centre." },
      { san: "d6",   color: "b", from: "d7", to: "d6", comment: "Les Noirs consolident leur structure de pions." },
      { san: "Nc3",  color: "w", from: "b1", to: "c3", comment: "Développement naturel du second cavalier." },
      { san: "Qe8",  color: "b", from: "d8", to: "e8", comment: "Coup thématique de la Leningrad : la dame se prépare à rejoindre h5 ou g6 pour soutenir une attaque à l'aile roi." },
      { san: "d5",   color: "w", from: "d4", to: "d5", comment: "Les Blancs gagnent de l'espace au centre." },
      { san: "Na6",  color: "b", from: "b8", to: "a6", comment: "Le cavalier noir se prépare à rejoindre c5, une case idéale dans cette structure." }
    ]
  },

  reti: {
    name: "Ouverture Réti",
    eco: "A09",
    description: "Les Blancs développent leur cavalier avant tout autre pion, gardant un maximum de flexibilité pour choisir leur structure selon la réponse noire.",
    moves: [
      { san: "Nf3",  color: "w", from: "g1", to: "f3", comment: "L'Ouverture Réti : les Blancs développent leur cavalier avant de décider de la structure de pions, gardant un maximum de flexibilité." },
      { san: "d5",   color: "b", from: "d7", to: "d5", comment: "Les Noirs occupent le centre." },
      { san: "c4",   color: "w", from: "c2", to: "c4", comment: "Les Blancs contestent le centre depuis le flanc, une idée hypermoderne." },
      { san: "e6",   color: "b", from: "e7", to: "e6", comment: "Les Noirs renforcent leur centre et préparent le développement de leur fou." },
      { san: "b3",   color: "w", from: "b2", to: "b3", comment: "Les Blancs préparent un fianchetto du fou dame, visant la diagonale a1-h8." },
      { san: "Nf6",  color: "b", from: "g8", to: "f6", comment: "Les Noirs développent leur cavalier." },
      { san: "Bb2",  color: "w", from: "c1", to: "b2", comment: "Le fou blanc complète son fianchetto, exerçant une pression à distance sur le centre noir." },
      { san: "Be7",  color: "b", from: "f8", to: "e7", comment: "Les Noirs développent modestement leur fou, préparant le roque." },
      { san: "g3",   color: "w", from: "g2", to: "g3", comment: "Les Blancs préparent un second fianchetto, cette fois du fou roi." },
      { san: "O-O",  color: "b", from: "e8", to: "g8", castle: { rookFrom: "h8", rookTo: "f8" }, comment: "Les Noirs roquent, mettant leur roi à l'abri." },
      { san: "Bg2",  color: "w", from: "f1", to: "g2", comment: "Le fou blanc complète le second fianchetto, une configuration très solide et flexible." },
      { san: "c5",   color: "b", from: "c7", to: "c5", comment: "Les Noirs contestent le centre depuis le flanc dame." },
      { san: "O-O",  color: "w", from: "e1", to: "g1", castle: { rookFrom: "h1", rookTo: "f1" }, comment: "Les Blancs roquent à leur tour." },
      { san: "Nc6",  color: "b", from: "b8", to: "c6", comment: "Les Noirs développent leur second cavalier." },
      { san: "e3",   color: "w", from: "e2", to: "e3", comment: "Les Blancs consolident leur position avant de choisir un plan précis." },
      { san: "b6",   color: "b", from: "b7", to: "b6", comment: "Les Noirs préparent leur propre fianchetto, complétant une structure très symétrique et équilibrée." }
    ]
  },

  "bogo-indienne": {
    name: "Défense Bogo-Indienne",
    eco: "E11",
    description: "Face à 3.Nf3, les Noirs donnent un échec immédiat en b4 plutôt que de préparer la Nimzo-Indienne, menant à un jeu plus calme.",
    moves: [
      { san: "d4",   color: "w", from: "d2", to: "d4", comment: "Les Blancs prennent le centre." },
      { san: "Nf6",  color: "b", from: "g8", to: "f6", comment: "Les Noirs développent leur cavalier." },
      { san: "c4",   color: "w", from: "c2", to: "c4", comment: "Les Blancs élargissent leur emprise sur le centre." },
      { san: "e6",   color: "b", from: "e7", to: "e6", comment: "Les Noirs préparent un développement flexible." },
      { san: "Nf3",  color: "w", from: "g1", to: "f3", comment: "Contrairement à la Nimzo-Indienne, les Blancs développent ici leur cavalier en f3 plutôt qu'en c3." },
      { san: "Bb4+", color: "b", from: "f8", to: "b4", comment: "La Défense Bogo-Indienne : les Noirs donnent un échec immédiat, forçant les Blancs à réagir." },
      { san: "Bd2",  color: "w", from: "c1", to: "d2", comment: "Les Blancs bloquent l'échec avec leur fou, proposant un échange." },
      { san: "Qe7",  color: "b", from: "d8", to: "e7", comment: "Les Noirs gardent la tension en développant leur dame plutôt que d'échanger immédiatement." },
      { san: "g3",   color: "w", from: "g2", to: "g3", comment: "Les Blancs préparent un fianchetto de leur fou roi." },
      { san: "Nc6",  color: "b", from: "b8", to: "c6", comment: "Les Noirs développent leur second cavalier, une idée caractéristique de cette ligne." },
      { san: "Bg2",  color: "w", from: "f1", to: "g2", comment: "Le fou blanc complète le fianchetto." },
      { san: "Bxd2+", color: "b", from: "b4", to: "d2", capture: "d2", comment: "Les Noirs échangent enfin leur fou contre celui de d2, avec échec." },
      { san: "Nbxd2", color: "w", from: "b1", to: "d2", capture: "d2", comment: "Les Blancs reprennent avec le cavalier b1, gardant leur cavalier f3 actif." },
      { san: "d6",   color: "b", from: "d7", to: "d6", comment: "Les Noirs consolident leur centre et préparent le roque." },
      { san: "O-O",  color: "w", from: "e1", to: "g1", castle: { rookFrom: "h1", rookTo: "f1" }, comment: "Les Blancs roquent, mettant leur roi à l'abri." },
      { san: "O-O",  color: "b", from: "e8", to: "g8", castle: { rookFrom: "h8", rookTo: "f8" }, comment: "Les Noirs roquent à leur tour, terminant leur développement." }
    ]
  },

  "est-indienne-dame": {
    name: "Défense Est-Indienne de la Dame",
    eco: "E12",
    description: "Les Noirs préparent un fianchetto de leur fou dame en b7 pour contrôler la case e4 depuis la grande diagonale, une défense très solide.",
    moves: [
      { san: "d4",   color: "w", from: "d2", to: "d4", comment: "Les Blancs prennent le centre." },
      { san: "Nf6",  color: "b", from: "g8", to: "f6", comment: "Les Noirs développent leur cavalier." },
      { san: "c4",   color: "w", from: "c2", to: "c4", comment: "Les Blancs élargissent leur emprise sur le centre." },
      { san: "e6",   color: "b", from: "e7", to: "e6", comment: "Les Noirs préparent un développement flexible." },
      { san: "Nf3",  color: "w", from: "g1", to: "f3", comment: "Les Blancs développent leur cavalier en f3, laissant la porte ouverte à plusieurs systèmes noirs." },
      { san: "b6",   color: "b", from: "b7", to: "b6", comment: "La Défense Est-Indienne de la Dame : les Noirs préparent un fianchetto pour contrôler la case e4." },
      { san: "g3",   color: "w", from: "g2", to: "g3", comment: "Les Blancs répondent avec leur propre fianchetto, une configuration très harmonieuse." },
      { san: "Bb7",  color: "b", from: "c8", to: "b7", comment: "Le fou noir prend position en b7, visant directement le centre depuis la grande diagonale." },
      { san: "Bg2",  color: "w", from: "f1", to: "g2", comment: "Le fou blanc complète le fianchetto." },
      { san: "Be7",  color: "b", from: "f8", to: "e7", comment: "Les Noirs développent modestement leur second fou, préparant le roque." },
      { san: "O-O",  color: "w", from: "e1", to: "g1", castle: { rookFrom: "h1", rookTo: "f1" }, comment: "Les Blancs roquent, mettant leur roi à l'abri." },
      { san: "O-O",  color: "b", from: "e8", to: "g8", castle: { rookFrom: "h8", rookTo: "f8" }, comment: "Les Noirs roquent à leur tour." },
      { san: "Nc3",  color: "w", from: "b1", to: "c3", comment: "Les Blancs développent leur second cavalier, augmentant la pression sur e4 et d5." },
      { san: "Ne4",  color: "b", from: "f6", to: "e4", comment: "Les Noirs placent leur cavalier de façon très active au centre, défié par le cavalier c3." },
      { san: "Qc2",  color: "w", from: "d1", to: "c2", comment: "Les Blancs préparent de reprendre sur c3 avec la dame tout en gardant l'initiative." },
      { san: "Nxc3", color: "b", from: "e4", to: "c3", capture: "c3", comment: "Les Noirs échangent leur cavalier avancé plutôt que de le laisser être chassé." }
    ]
  },

  "gambit-du-roi": {
    name: "Gambit du Roi",
    eco: "C33",
    description: "Une ouverture romantique et agressive : les Blancs sacrifient un pion dès le second coup pour ouvrir la colonne f et lancer une attaque rapide.",
    moves: [
      { san: "e4",   color: "w", from: "e2", to: "e4", comment: "Le pion roi avance en e4." },
      { san: "e5",   color: "b", from: "e7", to: "e5", comment: "Les Noirs répondent symétriquement." },
      { san: "f4",   color: "w", from: "f2", to: "f4", comment: "Le Gambit du Roi : les Blancs offrent un pion pour ouvrir la colonne f et attaquer rapidement." },
      { san: "exf4", color: "b", from: "e5", to: "f4", capture: "f4", comment: "Les Noirs acceptent le pion offert." },
      { san: "Nf3",  color: "w", from: "g1", to: "f3", comment: "Les Blancs développent leur cavalier tout en empêchant ...Qh4+." },
      { san: "g5",   color: "b", from: "g7", to: "g5", comment: "Les Noirs défendent leur pion supplémentaire en gagnant de l'espace à l'aile roi." },
      { san: "h4",   color: "w", from: "h2", to: "h4", comment: "Les Blancs attaquent immédiatement la chaîne de pions noirs." },
      { san: "g4",   color: "b", from: "g5", to: "g4", comment: "Les Noirs avancent, chassant le cavalier." },
      { san: "Ne5",  color: "w", from: "f3", to: "e5", comment: "Le Gambit Kieseritzky : le cavalier saute en e5 plutôt que de reculer, restant très actif." },
      { san: "Nf6",  color: "b", from: "g8", to: "f6", comment: "Les Noirs développent leur cavalier, menaçant de regagner le pion e4." },
      { san: "Bc4",  color: "w", from: "f1", to: "c4", comment: "Les Blancs développent leur fou de façon très active, visant f7." },
      { san: "d5",   color: "b", from: "d7", to: "d5", comment: "Les Noirs contre-attaquent immédiatement au centre." },
      { san: "exd5", color: "w", from: "e4", to: "d5", capture: "d5", comment: "Les Blancs capturent en d5." },
      { san: "Bd6",  color: "b", from: "f8", to: "d6", comment: "Les Noirs développent leur fou en visant le cavalier e5." },
      { san: "d4",   color: "w", from: "d2", to: "d4", comment: "Les Blancs soutiennent solidement leur cavalier avancé." },
      { san: "Nh5",  color: "b", from: "f6", to: "h5", comment: "Les Noirs préparent de regagner leur pion f4 ou de soutenir ...Qh4+ selon les cas." }
    ]
  },

  "quatre-cavaliers": {
    name: "Partie des Quatre Cavaliers",
    eco: "C48",
    description: "Une ouverture très symétrique et classique où les deux camps développent leurs deux cavaliers avant tout autre pièce.",
    moves: [
      { san: "e4",   color: "w", from: "e2", to: "e4", comment: "Le pion roi avance en e4." },
      { san: "e5",   color: "b", from: "e7", to: "e5", comment: "Les Noirs répondent symétriquement." },
      { san: "Nf3",  color: "w", from: "g1", to: "f3", comment: "Le cavalier attaque le pion e5." },
      { san: "Nc6",  color: "b", from: "b8", to: "c6", comment: "Les Noirs défendent leur pion en développant leur cavalier." },
      { san: "Nc3",  color: "w", from: "b1", to: "c3", comment: "La Partie des Quatre Cavaliers : les Blancs développent également leur second cavalier plutôt que leur fou." },
      { san: "Nf6",  color: "b", from: "g8", to: "f6", comment: "Les Noirs développent leur second cavalier, complétant la symétrie caractéristique de l'ouverture." },
      { san: "Bb5",  color: "w", from: "f1", to: "b5", comment: "Les Blancs adoptent une approche à la Ruy Lopez, clouant le cavalier c6." },
      { san: "Bb4",  color: "b", from: "f8", to: "b4", comment: "Les Noirs répondent en miroir, clouant à leur tour le cavalier c3." },
      { san: "O-O",  color: "w", from: "e1", to: "g1", castle: { rookFrom: "h1", rookTo: "f1" }, comment: "Les Blancs roquent, mettant leur roi à l'abri." },
      { san: "O-O",  color: "b", from: "e8", to: "g8", castle: { rookFrom: "h8", rookTo: "f8" }, comment: "Les Noirs roquent également, la position reste très symétrique." },
      { san: "d3",   color: "w", from: "d2", to: "d3", comment: "Les Blancs jouent un coup solide, préparant Bg5 ou Ne2 selon le plan choisi." },
      { san: "d6",   color: "b", from: "d7", to: "d6", comment: "Les Noirs renforcent leur centre de façon identique." },
      { san: "Bg5",  color: "w", from: "c1", to: "g5", comment: "Les Blancs clouent à leur tour le cavalier f6 sur la dame noire." },
      { san: "Bxc3", color: "b", from: "b4", to: "c3", capture: "c3", comment: "Les Noirs cassent la symétrie en échangeant leur fou contre le cavalier c3." },
      { san: "bxc3", color: "w", from: "b2", to: "c3", capture: "c3", comment: "Les Blancs reprennent avec le pion b, obtenant la paire de fous." },
      { san: "Qe7",  color: "b", from: "d8", to: "e7", comment: "Les Noirs développent leur dame, préparant de défendre leur propre clouage si nécessaire." }
    ]
  },

  philidor: {
    name: "Défense Philidor",
    eco: "C41",
    description: "Une défense solide et discrète : les Noirs soutiennent leur pion e5 avec le pion d plutôt qu'avec un cavalier, quitte à rester un peu passifs.",
    moves: [
      { san: "e4",   color: "w", from: "e2", to: "e4", comment: "Le pion roi avance en e4." },
      { san: "e5",   color: "b", from: "e7", to: "e5", comment: "Les Noirs répondent symétriquement." },
      { san: "Nf3",  color: "w", from: "g1", to: "f3", comment: "Le cavalier attaque le pion e5." },
      { san: "d6",   color: "b", from: "d7", to: "d6", comment: "La Défense Philidor : les Noirs défendent solidement leur pion e5 avec le pion d, plutôt qu'avec un cavalier." },
      { san: "d4",   color: "w", from: "d2", to: "d4", comment: "Les Blancs ouvrent immédiatement le centre." },
      { san: "Nf6",  color: "b", from: "g8", to: "f6", comment: "Les Noirs développent leur cavalier, attaquant le pion e4." },
      { san: "Nc3",  color: "w", from: "b1", to: "c3", comment: "Les Blancs protègent leur pion e4 en développant leur second cavalier." },
      { san: "Nbd7", color: "b", from: "b8", to: "d7", comment: "La Variante Hanham : les Noirs développent leur second cavalier en d7 plutôt qu'en c6, gardant leur structure de pions solide." },
      { san: "Bc4",  color: "w", from: "f1", to: "c4", comment: "Le fou blanc se développe activement, visant la case f7." },
      { san: "Be7",  color: "b", from: "f8", to: "e7", comment: "Les Noirs développent modestement leur fou, préparant le roque." },
      { san: "O-O",  color: "w", from: "e1", to: "g1", castle: { rookFrom: "h1", rookTo: "f1" }, comment: "Les Blancs roquent, mettant leur roi à l'abri." },
      { san: "O-O",  color: "b", from: "e8", to: "g8", castle: { rookFrom: "h8", rookTo: "f8" }, comment: "Les Noirs roquent à leur tour." },
      { san: "Qe2",  color: "w", from: "d1", to: "e2", comment: "Les Blancs préparent Rd1 tout en gardant un œil sur le centre." },
      { san: "c6",   color: "b", from: "c7", to: "c6", comment: "Les Noirs préparent ...Qc7 et renforcent leur position centrale." },
      { san: "a4",   color: "w", from: "a2", to: "a4", comment: "Les Blancs empêchent ...b5 et gagnent de l'espace à l'aile dame." },
      { san: "exd4", color: "b", from: "e5", to: "d4", capture: "d4", comment: "Les Noirs relâchent enfin la tension centrale en capturant sur d4." }
    ]
  },

  evans: {
    name: "Gambit Évans",
    eco: "C51",
    description: "Une arme romantique et agressive contre la Partie Italienne : les Blancs sacrifient un pion à l'aile dame pour gagner un temps et bâtir un centre puissant.",
    moves: [
      { san: "e4",   color: "w", from: "e2", to: "e4", comment: "Le pion roi avance en e4, ouvrant la voie à une partie ouverte." },
      { san: "e5",   color: "b", from: "e7", to: "e5", comment: "Les Noirs répondent symétriquement au centre." },
      { san: "Nf3",  color: "w", from: "g1", to: "f3", comment: "Développement naturel, attaquant le pion e5." },
      { san: "Nc6",  color: "b", from: "b8", to: "c6", comment: "Le cavalier noir défend son pion e5." },
      { san: "Bc4",  color: "w", from: "f1", to: "c4", comment: "Le fou blanc vise f7, comme dans la Partie Italienne." },
      { san: "Bc5",  color: "b", from: "f8", to: "c5", comment: "Les Noirs développent en miroir : on est en Partie Italienne, jusqu'au prochain coup blanc." },
      { san: "b4",   color: "w", from: "b2", to: "b4", comment: "Le Gambit Évans : les Blancs sacrifient un pion pour gagner un temps sur le fou et bâtir un centre de pions imposant." },
      { san: "Bxb4", color: "b", from: "c5", to: "b4", capture: "b4", comment: "Les Noirs acceptent le pion offert." },
      { san: "c3",   color: "w", from: "c2", to: "c3", comment: "Les Blancs attaquent aussitôt le fou tout en préparant d2-d4." },
      { san: "Ba5",  color: "b", from: "b4", to: "a5", comment: "Le fou recule en a5, restant actif sur la diagonale plutôt que de s'échanger." },
      { san: "d4",   color: "w", from: "d2", to: "d4", comment: "Les Blancs construisent leur grand centre, le vrai bénéfice recherché par le gambit." },
      { san: "exd4", color: "b", from: "e5", to: "d4", capture: "d4", comment: "Les Noirs prennent le pion central, acceptant de rendre du matériel plus tard." },
      { san: "O-O",  color: "w", from: "e1", to: "g1", castle: { rookFrom: "h1", rookTo: "f1" }, comment: "Petit roque : le roi blanc se met à l'abri avec un temps d'avance en développement." },
      { san: "d6",   color: "b", from: "d7", to: "d6", comment: "Les Noirs consolident leur position et libèrent la diagonale de leur fou c8, en gardant le pion supplémentaire pour l'instant." },
      { san: "cxd4", color: "w", from: "c3", to: "d4", capture: "d4", comment: "Les Blancs reprennent le pion d4, retrouvant l'équilibre matériel avec un centre fort et une avance de développement — l'idée même du gambit." },
      { san: "Bb6",  color: "b", from: "a5", to: "b6", comment: "Le fou noir se replie en b6, hors de portée d'un futur Nc3-d5 ou Qb3, tout en restant actif sur la grande diagonale." }
    ]
  },

  berlinoise: {
    name: "Défense Berlinoise",
    eco: "C67",
    description: "La fameuse « Muraille de Berlin » : plutôt que de défendre passivement, les Noirs contre-attaquent le pion e4, menant souvent à un finale de dames réputé très solide.",
    moves: [
      { san: "e4",    color: "w", from: "e2", to: "e4", comment: "Le pion roi avance en e4." },
      { san: "e5",    color: "b", from: "e7", to: "e5", comment: "Réponse symétrique classique." },
      { san: "Nf3",   color: "w", from: "g1", to: "f3", comment: "Le cavalier attaque le pion e5." },
      { san: "Nc6",   color: "b", from: "b8", to: "c6", comment: "Les Noirs défendent leur pion e5." },
      { san: "Bb5",   color: "w", from: "f1", to: "b5", comment: "Ruy Lopez (partie espagnole) : le fou blanc pique le cavalier c6, qui défend indirectement e5." },
      { san: "Nf6",   color: "b", from: "g8", to: "f6", comment: "La Défense Berlinoise : au lieu de défendre passivement, les Noirs contre-attaquent tout de suite le pion e4." },
      { san: "O-O",   color: "w", from: "e1", to: "g1", castle: { rookFrom: "h1", rookTo: "f1" }, comment: "Petit roque, en laissant volontairement le pion e4 sans défense supplémentaire." },
      { san: "Nxe4",  color: "b", from: "f6", to: "e4", capture: "e4", comment: "Les Noirs capturent le pion e4, comme le permet la ligne berlinoise." },
      { san: "d4",    color: "w", from: "d2", to: "d4", comment: "Les Blancs ouvrent le centre pour exploiter leur avance de développement." },
      { san: "Nd6",   color: "b", from: "e4", to: "d6", comment: "Le cavalier recule en d6, attaquant au passage le fou b5." },
      { san: "Bxc6",  color: "w", from: "b5", to: "c6", capture: "c6", comment: "Les Blancs échangent leur fou contre le cavalier c6, abîmant la structure de pions noirs." },
      { san: "dxc6",  color: "b", from: "d7", to: "c6", capture: "c6", comment: "Les Noirs reprennent avec le pion d, acceptant des pions doublés mais conservant la paire de fous." },
      { san: "dxe5",  color: "w", from: "d4", to: "e5", capture: "e5", comment: "Les Blancs capturent le pion e5, chassant au passage le cavalier d6." },
      { san: "Nf5",   color: "b", from: "d6", to: "f5", comment: "Le cavalier se replie en f5, hors d'atteinte." },
      { san: "Qxd8+", color: "w", from: "d1", to: "d8", capture: "d8", comment: "Échange des dames avec échec : la fameuse « muraille de Berlin » commence, un finale réputé très difficile à faire tomber pour les Blancs." },
      { san: "Kxd8",  color: "b", from: "e8", to: "d8", capture: "d8", comment: "Le roi noir reprend ; malgré la perte du roque, sa structure solide et sa paire de fous rendent cette position étonnamment tenace." }
    ]
  },

  "sicilienne-dragon": {
    name: "Défense Sicilienne (Dragon)",
    eco: "B70",
    description: "Une des variantes les plus tranchantes de la Sicilienne : les Noirs fianchettent leur fou en g7, préparant souvent une partie où les rois roquent chacun de leur côté.",
    moves: [
      { san: "e4",   color: "w", from: "e2", to: "e4", comment: "Le pion roi avance en e4." },
      { san: "c5",   color: "b", from: "c7", to: "c5", comment: "La Défense Sicilienne : les Noirs contestent le centre depuis le flanc, la réponse la plus jouée contre 1.e4." },
      { san: "Nf3",  color: "w", from: "g1", to: "f3", comment: "Développement naturel, préparant d2-d4." },
      { san: "d6",   color: "b", from: "d7", to: "d6", comment: "Les Noirs préparent ...Nf6 sans craindre e4-e5." },
      { san: "d4",   color: "w", from: "d2", to: "d4", comment: "Les Blancs ouvrent le centre." },
      { san: "cxd4", color: "b", from: "c5", to: "d4", capture: "d4", comment: "Échange au centre, ouvrant la colonne c pour la tour noire." },
      { san: "Nxd4", color: "w", from: "f3", to: "d4", capture: "d4", comment: "Le cavalier blanc reprend, bien centralisé." },
      { san: "Nf6",  color: "b", from: "g8", to: "f6", comment: "Développement naturel, attaquant le pion e4." },
      { san: "Nc3",  color: "w", from: "b1", to: "c3", comment: "Les Blancs défendent e4 tout en développant." },
      { san: "g6",   color: "b", from: "g7", to: "g6", comment: "La Variante Dragon : les Noirs préparent un fianchetto de leur fou en g7, la diagonale qui donne son nom à cette variante." },
      { san: "Be3",  color: "w", from: "c1", to: "e3", comment: "Développement typique préparant Qd2 et le grand roque, en vue de l'Attaque Yougoslave." },
      { san: "Bg7",  color: "b", from: "f8", to: "g7", comment: "Le « Dragon » prend position, visant toute la grande diagonale a1-h8." },
      { san: "f3",   color: "w", from: "f2", to: "f3", comment: "Les Blancs renforcent leur centre et préparent g2-g4-h4, le plan d'attaque typique de l'Attaque Yougoslave." },
      { san: "O-O",  color: "b", from: "e8", to: "g8", castle: { rookFrom: "h8", rookTo: "f8" }, comment: "Les Noirs roquent — dans le Dragon, les rois se retrouvent souvent de part et d'autre, promesse d'une partie tranchante." },
      { san: "Qd2",  color: "w", from: "d1", to: "d2", comment: "La dame blanche se prépare à rejoindre h6 et soutient un futur grand roque." },
      { san: "Nc6",  color: "b", from: "b8", to: "c6", comment: "Le cavalier noir complète son développement, prêt à répliquer au centre selon les circonstances." }
    ]
  },

  benko: {
    name: "Gambit Benko",
    eco: "A57",
    description: "Les Noirs sacrifient un ou deux pions à l'aile dame pour ouvrir les colonnes a et b contre le roi blanc, avec une compensation positionnelle durable.",
    moves: [
      { san: "d4",   color: "w", from: "d2", to: "d4", comment: "Les Blancs prennent le centre avec le pion dame." },
      { san: "Nf6",  color: "b", from: "g8", to: "f6", comment: "Développement flexible, sans encore s'engager sur la structure de pions." },
      { san: "c4",   color: "w", from: "c2", to: "c4", comment: "Les Blancs élargissent leur emprise sur le centre." },
      { san: "c5",   color: "b", from: "c7", to: "c5", comment: "Les Noirs contestent immédiatement le centre par le flanc." },
      { san: "d5",   color: "w", from: "d4", to: "d5", comment: "Les Blancs poussent, gagnant de l'espace et fermant provisoirement le centre." },
      { san: "b5",   color: "b", from: "b7", to: "b5", comment: "Le Gambit Benko : les Noirs sacrifient un pion à l'aile dame pour ouvrir les colonnes a et b contre le roi blanc." },
      { san: "cxb5", color: "w", from: "c4", to: "b5", capture: "b5", comment: "Les Blancs acceptent le pion offert." },
      { san: "a6",   color: "b", from: "a7", to: "a6", comment: "Les Noirs insistent, offrant un second pion pour ouvrir davantage les lignes." },
      { san: "bxa6", color: "w", from: "b5", to: "a6", capture: "a6", comment: "Les Blancs prennent à nouveau." },
      { san: "Bxa6", color: "b", from: "c8", to: "a6", capture: "a6", comment: "Le fou noir reprend en a6, prenant place sur la longue diagonale a6-f1 : malgré les pions de retard, les Noirs obtiennent une pression durable à l'aile dame." },
      { san: "Nc3",  color: "w", from: "b1", to: "c3", comment: "Développement naturel du cavalier." },
      { san: "d6",   color: "b", from: "d7", to: "d6", comment: "Les Noirs renforcent leur centre et ouvrent la diagonale de leur fou f8." },
      { san: "e4",   color: "w", from: "e2", to: "e4", comment: "Les Blancs achèvent leur centre de pions, mais dégagent au passage la case f1." },
      { san: "Bxf1", color: "b", from: "a6", to: "f1", capture: "f1", comment: "Le fou noir capture sur f1 : privés du roque, les Blancs devront amener leur roi à l'abri autrement — un vrai succès positionnel pour la compensation du gambit." },
      { san: "Kxf1", color: "w", from: "e1", to: "f1", capture: "f1", comment: "Le roi blanc doit reprendre lui-même, perdant définitivement le droit au roque." },
      { san: "g6",   color: "b", from: "g7", to: "g6", comment: "Les Noirs poursuivent leur plan avec un fianchetto en g7, visant à son tour la longue diagonale et complétant une compensation durable pour les pions sacrifiés." }
    ]
  },

  trompowsky: {
    name: "Attaque Trompowsky",
    eco: "A45",
    description: "Une arme discrète et pratique contre 1...Cf6 : les Blancs sortent immédiatement leur fou en g5 pour éviter tout le vaste répertoire des défenses indiennes.",
    moves: [
      { san: "d4",   color: "w", from: "d2", to: "d4", comment: "Les Blancs occupent le centre avec le pion dame." },
      { san: "Nf6",  color: "b", from: "g8", to: "f6", comment: "Développement naturel et flexible des Noirs." },
      { san: "Bg5",  color: "w", from: "c1", to: "g5", comment: "L'Attaque Trompowsky : les Blancs sortent immédiatement leur fou pour engager le cavalier f6, évitant les défenses indiennes classiques." },
      { san: "e6",   color: "b", from: "e7", to: "e6", comment: "Les Noirs préparent leur développement sans se soucier immédiatement du clouage." },
      { san: "e4",   color: "w", from: "e2", to: "e4", comment: "Les Blancs prennent un grand centre, profitant de ce que le cavalier noir est gêné dans ses répliques." },
      { san: "h6",   color: "b", from: "h7", to: "h6", comment: "Les Noirs interrogent le fou, qui doit se décider : capturer, reculer ou avancer." },
      { san: "Bxf6", color: "w", from: "g5", to: "f6", capture: "f6", comment: "Les Blancs échangent leur fou contre le cavalier, dans l'idée d'abîmer la structure de pions noirs ou de garder l'initiative." },
      { san: "Qxf6", color: "b", from: "d8", to: "f6", capture: "f6", comment: "La dame noire reprend en f6, bien centralisée, évitant les pions doublés." },
      { san: "Nc3",  color: "w", from: "b1", to: "c3", comment: "Développement naturel, renforçant le centre." },
      { san: "d6",   color: "b", from: "d7", to: "d6", comment: "Les Noirs complètent leur structure de pions et libèrent leur fou c8." },
      { san: "Nf3",  color: "w", from: "g1", to: "f3", comment: "Les Blancs développent leur second cavalier." },
      { san: "Nd7",  color: "b", from: "b8", to: "d7", comment: "Le cavalier noir se développe en d7, laissant la dame f6 libre d'agir et préparant ...e5." },
      { san: "Bd3",  color: "w", from: "f1", to: "d3", comment: "Développement naturel du fou, visant l'aile roi." },
      { san: "g6",   color: "b", from: "g7", to: "g6", comment: "Les Noirs préparent un fianchetto pour renforcer la surveillance des cases noires, souvent affaiblies après l'échange des fous." },
      { san: "O-O",  color: "w", from: "e1", to: "g1", castle: { rookFrom: "h1", rookTo: "f1" }, comment: "Petit roque : le roi blanc se met à l'abri." },
      { san: "Bg7",  color: "b", from: "f8", to: "g7", comment: "Le fou noir complète le fianchetto ; la partie s'annonce stratégique autour du contrôle des cases noires." }
    ]
  },

  "semi-slave": {
    name: "Défense Semi-Slave",
    eco: "D43",
    description: "Un carrefour très solide du Gambit Dame : les Noirs soutiennent d5 à la fois avec c6 et e6, avec en ligne de mire l'expansion thématique ...b5 de la Variante Meran.",
    moves: [
      { san: "d4",   color: "w", from: "d2", to: "d4", comment: "Les Blancs prennent le centre." },
      { san: "d5",   color: "b", from: "d7", to: "d5", comment: "Réponse symétrique classique." },
      { san: "c4",   color: "w", from: "c2", to: "c4", comment: "Le Gambit Dame : les Blancs proposent l'échange du pion c contre une influence centrale accrue." },
      { san: "c6",   color: "b", from: "c7", to: "c6", comment: "La Défense Slave : les Noirs soutiennent d5 avec le pion c, sans enfermer leur fou c8." },
      { san: "Nf3",  color: "w", from: "g1", to: "f3", comment: "Développement naturel." },
      { san: "Nf6",  color: "b", from: "g8", to: "f6", comment: "Développement symétrique des Noirs." },
      { san: "Nc3",  color: "w", from: "b1", to: "c3", comment: "Les Blancs renforcent la pression sur d5." },
      { san: "e6",   color: "b", from: "e7", to: "e6", comment: "La Défense Semi-Slave : les Noirs jouent aussi ...e6, préparant un développement solide et gardant l'option ...dxc4 suivi de ...b5." },
      { san: "e3",   color: "w", from: "e2", to: "e3", comment: "Développement solide et flexible, gardant les options ouvertes." },
      { san: "Nbd7", color: "b", from: "b8", to: "d7", comment: "Le cavalier se développe en d7 plutôt qu'en c6, pour ne pas gêner une éventuelle poussée ...c5 plus tard." },
      { san: "Bd3",  color: "w", from: "f1", to: "d3", comment: "Développement naturel du fou vers l'aile roi." },
      { san: "dxc4", color: "b", from: "d5", to: "c4", capture: "c4", comment: "Les Noirs capturent enfin en c4, préparant l'expansion caractéristique ...b5 de la Variante Meran." },
      { san: "Bxc4", color: "w", from: "d3", to: "c4", capture: "c4", comment: "Les Blancs reprennent immédiatement avec le fou." },
      { san: "b5",   color: "b", from: "b7", to: "b5", comment: "Le coup thématique de la Meran : les Noirs gagnent un temps sur le fou tout en prenant de l'espace à l'aile dame." },
      { san: "Bd3",  color: "w", from: "c4", to: "d3", comment: "Le fou blanc doit reculer en d3." },
      { san: "Bb7",  color: "b", from: "c8", to: "b7", comment: "Le fou noir se développe en b7, complétant une structure solide et équilibrée typique de la Variante Meran." }
    ]
  },

  bird: {
    name: "Ouverture Bird",
    eco: "A02",
    description: "Une ouverture de flanc peu commune : les Blancs avancent d'emblée le pion f pour contrôler e5, une structure qui s'apparente à une Défense Hollandaise inversée.",
    moves: [
      { san: "f4",  color: "w", from: "f2", to: "f4", comment: "L'Ouverture Bird : les Blancs avancent le pion f pour contrôler e5, une structure qui s'apparente à une Défense Hollandaise inversée." },
      { san: "d5",  color: "b", from: "d7", to: "d5", comment: "Les Noirs occupent le centre." },
      { san: "Nf3", color: "w", from: "g1", to: "f3", comment: "Développement naturel, protégeant au passage le pion f4." },
      { san: "Nf6", color: "b", from: "g8", to: "f6", comment: "Développement symétrique." },
      { san: "e3",  color: "w", from: "e2", to: "e3", comment: "Les Blancs préparent un développement solide du fou f1 et gardent une structure flexible." },
      { san: "e6",  color: "b", from: "e7", to: "e6", comment: "Les Noirs adoptent une structure tout aussi solide." },
      { san: "b3",  color: "w", from: "b2", to: "b3", comment: "Les Blancs préparent un fianchetto de leur fou dame, une manœuvre typique de ce système." },
      { san: "Be7", color: "b", from: "f8", to: "e7", comment: "Développement naturel avant le roque." },
      { san: "Bb2", color: "w", from: "c1", to: "b2", comment: "Le fou blanc prend position en b2, visant la grande diagonale et le futur roque noir." },
      { san: "O-O", color: "b", from: "e8", to: "g8", castle: { rookFrom: "h8", rookTo: "f8" }, comment: "Les Noirs roquent, mettant leur roi à l'abri." },
      { san: "Be2", color: "w", from: "f1", to: "e2", comment: "Développement discret du fou f1, préparant le roque blanc." },
      { san: "c5",  color: "b", from: "c7", to: "c5", comment: "Les Noirs gagnent de l'espace à l'aile dame." },
      { san: "O-O", color: "w", from: "e1", to: "g1", castle: { rookFrom: "h1", rookTo: "f1" }, comment: "Les Blancs roquent à leur tour." },
      { san: "Nc6", color: "b", from: "b8", to: "c6", comment: "Développement naturel du cavalier noir." },
      { san: "Ne5", color: "w", from: "f3", to: "e5", comment: "Le cavalier blanc se centralise avec tempo, une case forte typique de l'Ouverture Bird." },
      { san: "Qc7", color: "b", from: "d8", to: "c7", comment: "Les Noirs répliquent en défendant la case c6 et en gardant un œil sur la colonne c." }
    ]
  },

  larsen: {
    name: "Attaque Larsen",
    eco: "A01",
    description: "Aussi appelée Attaque Nimzo-Larsen : les Blancs préparent un fianchetto de leur fou dame dès le premier coup, plutôt que d'occuper directement le centre avec un pion.",
    moves: [
      { san: "b3",   color: "w", from: "b2", to: "b3", comment: "L'Attaque Larsen : les Blancs préparent un fianchetto de leur fou dame plutôt que d'occuper directement le centre." },
      { san: "e5",   color: "b", from: "e7", to: "e5", comment: "Les Noirs prennent le centre sans attendre." },
      { san: "Bb2",  color: "w", from: "c1", to: "b2", comment: "Le fou blanc prend position sur la grande diagonale, visant à terme le pion e5 et le roi noir." },
      { san: "Nc6",  color: "b", from: "b8", to: "c6", comment: "Les Noirs défendent leur pion central." },
      { san: "e3",   color: "w", from: "e2", to: "e3", comment: "Les Blancs préparent un développement solide du fou f1." },
      { san: "Nf6",  color: "b", from: "g8", to: "f6", comment: "Développement naturel des Noirs." },
      { san: "Bb5",  color: "w", from: "f1", to: "b5", comment: "Le fou blanc sort en b5, dans l'esprit d'un Ruy Lopez avec une couleur en moins." },
      { san: "Bd6",  color: "b", from: "f8", to: "d6", comment: "Les Noirs développent leur fou en défenseur supplémentaire du pion e5." },
      { san: "Nf3",  color: "w", from: "g1", to: "f3", comment: "Les Blancs complètent leur développement, pressant le pion e5 une troisième fois." },
      { san: "O-O",  color: "b", from: "e8", to: "g8", castle: { rookFrom: "h8", rookTo: "f8" }, comment: "Les Noirs roquent, mettant leur roi à l'abri." },
      { san: "O-O",  color: "w", from: "e1", to: "g1", castle: { rookFrom: "h1", rookTo: "f1" }, comment: "Les Blancs roquent à leur tour." },
      { san: "Re8",  color: "b", from: "f8", to: "e8", comment: "La tour noire vient soutenir le pion e5 depuis e8, une manœuvre de regroupement classique après le roque." },
      { san: "d4",   color: "w", from: "d2", to: "d4", comment: "Les Blancs remettent en question le centre noir, un thème récurrent des systèmes Larsen." },
      { san: "exd4", color: "b", from: "e5", to: "d4", capture: "d4", comment: "Les Noirs capturent au centre." },
      { san: "exd4", color: "w", from: "e3", to: "d4", capture: "d4", comment: "Les Blancs reprennent, ouvrant les lignes pour leurs pièces." },
      { san: "Qe7",  color: "b", from: "d8", to: "e7", comment: "La dame noire se développe modestement en e7, gardant un œil sur l'aile roi et complétant sa mobilisation." }
    ]
  }

};

