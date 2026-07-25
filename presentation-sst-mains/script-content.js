/*
 * Texte de la prestation — source unique (Word, Markdown, notes du présentateur).
 * Rencontre santé-sécurité « Prévention des blessures aux mains » — Dhilmar · Mine Éléonore.
 */
module.exports = {
  meta: {
    title: "Prévention des blessures aux mains",
    sub: "Guide d'animation — texte de la prestation",
    org: "Dhilmar — Mine Éléonore · Rencontre santé-sécurité",
    duree: "15 à 20 minutes",
    public: "Travailleurs de tous les corps de métier (fond de mine, maintenance, surface).",
    materiel: "Le deck (presentation.html ou le PPTX) et un écran; quelques exemples de gants à faire circuler (anti-coupure, cuir, nitrile, anti-vibration).",
  },
  facilitation: [
    "Ton bienveillant, jamais moralisateur : on protège les gens, on ne les blâme pas.",
    "Faites participer : posez les questions, laissez un vrai silence, accueillez les exemples.",
    "Rattachez chaque point à des tâches réelles vécues à Éléonore.",
    "Faites circuler un ou deux gants pendant la rencontre.",
    "Nommez le droit d'arrêt de travail dès le début et rappelez-le à la fin.",
    "Les deux séquences vidéo durent 5 secondes : annoncez ce qu'il faut observer avant de les lancer, puis rejouez-les au besoin.",
  ],
  slides: [
    {
      n: 1, title: "La sécurité entre vos mains", duree: "≈ 1 min",
      dites: [
        "Bonjour à tous, et merci d'être là. On prend une quinzaine de minutes ensemble sur un sujet qui nous concerne tous, peu importe le métier : nos mains.",
        "On les utilise à chaque geste, à chaque quart — et pourtant, c'est une des parties du corps qu'on blesse le plus souvent. L'objectif aujourd'hui, ce n'est pas de vous faire peur : c'est de repartir avec des réflexes simples pour que tout le monde rentre à la maison avec ses deux mains, en pleine forme.",
      ],
      demandez: "Levez la main : qui, ici, utilise ses mains comme principal outil de travail ? — Exactement, tout le monde.",
      retenir: "Le sujet nous concerne tous, chaque jour.",
    },
    {
      n: 2, title: "Objectifs de la rencontre", duree: "≈ 1 min",
      dites: [
        "Voici notre plan, quatre choses simples. Un : comprendre pourquoi nos mains sont autant exposées dans nos opérations. Deux : reconnaître ce qu'on appelle la « ligne de tir ». Trois : choisir et porter le bon gant selon la tâche. Quatre : savoir quoi faire — et déclarer — si ça arrive.",
      ],
      demandez: "",
      retenir: "Un objectif clair : des réflexes concrets, pas de la théorie.",
      transition: "Commençons par ce qu'on protège.",
    },
    {
      n: 3, title: "Vos mains, votre outil le plus précieux", duree: "≈ 1,5 min",
      dites: [
        "Prenez une seconde, regardez vos mains. Il y a 27 os dans chacune — plus du quart des os de tout votre corps, concentrés dans un tout petit espace. Ajoutez les tendons, les nerfs, les vaisseaux : c'est un outil d'une précision incroyable.",
        "Mais contrairement à une clé ou à un boulon, il n'y a pas de pièce de rechange. Une lacération profonde, un doigt écrasé, et c'est parfois une perte de mobilité pour la vie. Aux États-Unis seulement, plus d'un million de travailleurs se présentent à l'urgence chaque année pour une blessure à la main.",
      ],
      demandez: "Est-ce que quelqu'un connaît une personne qui a gardé des séquelles à une main après un accident ?",
      retenir: "Irremplaçables : aucune pièce de rechange.",
    },
    {
      n: 4, title: "Les chiffres qui parlent", duree: "≈ 2 min",
      dites: [
        "Regardons les chiffres, parce qu'ils sont parlants. Premièrement : environ 70 % des blessures aux mains arrivent à des gens qui ne portaient aucun gant. Et le 30 % qui restait ? Ils avaient un gant — mais pas le bon pour la tâche.",
        "Deuxièmement, et c'est la bonne nouvelle : 71 % de ces blessures pourraient être évitées avec le bon équipement. Autrement dit, la très grande majorité de ce qu'on voit aujourd'hui est évitable.",
        "Au Québec, environ 15 % de toutes les lésions indemnisées touchent les poignets, les mains et les doigts. Et quand il y a perte de temps, plus de 60 % de ces blessures sont des fractures ou des amputations.",
      ],
      demandez: "À votre avis, sur dix blessures aux mains, combien arrivent sans gant ? (Réponse : environ sept.)",
      retenir: "70 % sans gant · 71 % évitables.",
    },
    {
      n: 5, title: "Dans nos mines, la réalité", duree: "≈ 2 min",
      dites: [
        "Dans le secteur minier précisément, voici le portrait. Les blessures les plus fréquentes aux mains, ce sont les lacérations — plus de la moitié — suivies des fractures, environ le quart.",
        "Côté coûts, une blessure à la main avec perte de temps, c'est en moyenne entre 13 700 et 16 200 dollars de coûts directs — sans parler de la douleur et de l'impact sur la personne et sur l'équipe.",
        "Et un enjeu bien à nous : les vibrations. Avec des outils comme la foreuse, on parle du syndrome des doigts blancs — près des deux tiers des travailleurs affectés rapportent des engourdissements, un tiers, des douleurs articulaires. C'est insidieux : ça s'installe avec le temps.",
      ],
      demandez: "Qui utilise régulièrement des outils qui vibrent — foreuse, marteau, meuleuse ?",
      retenir: "Lacérations et fractures dominent; les vibrations sont un enjeu réel.",
    },
    {
      n: 6, title: "La « ligne de tir »", duree: "≈ 2 min",
      dites: [
        "Voici le concept le plus important de la rencontre : la « ligne de tir ». C'est toute zone où votre main peut être happée, écrasée, coupée ou pincée par une énergie — mécanique, hydraulique, électrique, ou simplement la gravité.",
        "Sur le schéma, la main est au centre, et tout autour, les dangers : écrasement, coupure, happement, pincement. Le réflexe à développer, avant chaque geste, tient en une question : « Si cette pièce bouge, où va ma main ? » Si la réponse, c'est « dans la zone de danger », on se replace.",
      ],
      demandez: "Donnez-moi un exemple concret de point de pincement que vous croisez ici, à Éléonore.",
      retenir: "« Si ça bouge, où va ma main ? »",
    },
    {
      n: 7, title: "Les causes principales", duree: "≈ 1,5 min",
      dites: [
        "D'où viennent concrètement les blessures ? Six grandes familles. Les points de pincement et de happement — pièces mobiles, engrenages, convoyeurs. Les outils et les lames — couteaux, meuleuses. La manutention et les arêtes vives — tôle, charges lourdes.",
        "L'énergie non maîtrisée — quand on n'a pas cadenassé. Les vibrations, dont on vient de parler. Et enfin, le gant absent ou inadéquat. Vous remarquez que presque toutes se ramènent à la ligne de tir.",
      ],
      demandez: "",
      retenir: "Presque toutes les causes ramènent à la ligne de tir.",
      transition: "Voyons ce que ça donne en vrai.",
    },
    {
      n: 8, title: "Vidéo — Le danger en un instant", duree: "≈ 1,5 min", video: true,
      dites: [
        "[Avant de lancer] Regardez bien cette courte séquence. Observez trois choses : où sont les mains par rapport aux pièces mobiles, si le point de pincement était visible, et ce qui aurait pu éliminer le risque.",
        "[Lancer la vidéo — 5 s, à rejouer au besoin]",
        "[Après] Ça va vite, hein ? Une fraction de seconde. La main était dans la ligne de tir. C'est exactement le genre de situation qu'on veut apprendre à voir venir.",
      ],
      demandez: "Qu'est-ce que vous auriez fait différemment ?",
      retenir: "Ça va vite : il faut anticiper.",
    },
    {
      n: 9, title: "La hiérarchie des moyens de prévention", duree: "≈ 2 min",
      dites: [
        "Maintenant, comment on se protège — dans le bon ordre. C'est la hiérarchie des moyens de prévention. En haut, le plus efficace : éliminer le danger complètement. Ensuite, le substituer ou réduire l'énergie en jeu. Puis l'ingénierie : protecteurs, gardes, outils qui gardent la main à distance. Ensuite l'administratif : procédures, cadenassage, formation. Et tout en bas : l'équipement de protection — le gant.",
        "Message important : le gant, c'est la dernière barrière, jamais la première. Il est essentiel, mais il ne remplace pas un protecteur ou un cadenassage. On ne compte pas sur le gant pour faire le travail qu'un garde devrait faire.",
      ],
      demandez: "",
      retenir: "Le gant est la dernière barrière, pas la première.",
    },
    {
      n: 10, title: "Les bons réflexes", duree: "≈ 2 min",
      dites: [
        "Concrètement, au quotidien, voici les réflexes. Gardez vos mains hors de la ligne de tir. Cadenassez et déchargez l'énergie avant d'intervenir — toujours. Utilisez des poussoirs, des crochets, des outils — jamais vos doigts pour dégager ou guider. Inspectez vos gants et changez-les dès qu'ils sont usés ou troués. Ne retirez jamais un gant près d'une pièce en rotation : le gant peut être happé et entraîner votre main. Et signalez les points de pincement pour qu'on les neutralise.",
        "Et la règle d'or, celle à retenir par-dessus tout : si vous ne voyez pas vos mains en sécurité, vous arrêtez. Aucune tâche n'est urgente au point de risquer une main. Vous avez tous le droit — et le devoir — d'arrêter le travail.",
      ],
      demandez: "Est-ce que tout le monde est à l'aise avec le droit d'arrêt de travail ?",
      retenir: "Si tu ne vois pas tes mains en sécurité — ARRÊTE.",
    },
    {
      n: 11, title: "Choisir le bon gant", duree: "≈ 2 min",
      dites: [
        "Le bon gant, c'est celui qui correspond au risque ET à la tâche. Rapidement : pour la manutention et les arêtes vives, un gant anti-coupure, niveau EN 388 C à F. Pour les travaux lourds et l'abrasion, du cuir ou un gant renforcé. Pour les huiles, hydrocarbures et produits chimiques, un gant nitrile ou néoprène étanche. Pour les outils vibrants, un gant anti-vibration. Pour le froid l'hiver, un gant isolé. Et pour les travaux électriques, un gant isolant diélectrique.",
        "Un point crucial : un gant anti-coupure ne protège PAS contre une pièce en rotation — au contraire, il peut être entraîné. Le bon gant, au bon endroit. Et un gant usé ou troué ne protège plus : inspectez-le avant chaque quart. [Faire circuler les gants]",
      ],
      demandez: "Est-ce que vous avez toujours accès facilement au bon gant pour vos tâches ?",
      retenir: "Le bon gant = le risque + la tâche.",
    },
    {
      n: 12, title: "Vidéo — La bonne méthode", duree: "≈ 1 min", video: true,
      dites: [
        "[Avant de lancer] À l'inverse, voici à quoi ça ressemble quand c'est bien fait. Observez : le gant est adapté et en bon état, la prise est ferme et contrôlée, et les mains restent hors de la ligne de tir.",
        "[Lancer la vidéo — 5 s]",
        "[Après] Voilà. Rien de spectaculaire — et c'est justement le but. Le travail sécuritaire, c'est ça : contrôlé, dégagé, sans surprise.",
      ],
      demandez: "",
      retenir: "Protégé, contrôlé, dégagé.",
    },
    {
      n: 13, title: "En cas de blessure", duree: "≈ 1,5 min",
      dites: [
        "Malgré tout, si une blessure arrive, voici les quatre étapes. Un : arrêter et sécuriser — on stoppe la tâche, on neutralise l'énergie, on protège la zone. Deux : les premiers soins immédiatement — secouriste ou infirmerie. Trois : signaler tout de suite au superviseur. Quatre, celui qu'on oublie trop souvent : déclarer — même une simple égratignure, même un presqu'accident.",
        "Pourquoi ? Parce qu'un petit incident déclaré aujourd'hui, c'est ce qui nous permet de corriger avant l'accident grave de demain. Déclarer, ce n'est jamais une faute — c'est une force pour toute l'équipe.",
      ],
      demandez: "Est-ce que tout le monde sait où est l'infirmerie et qui sont les secouristes de son quart ?",
      retenir: "Déclarer, même une égratignure.",
    },
    {
      n: 14, title: "Notre engagement", duree: "≈ 1 min",
      dites: [
        "On termine là-dessus. Chez Dhilmar, à Éléonore, on veut une chose toute simple : que chacun rentre à la maison avec ses deux mains, en pleine forme.",
        "Ça passe par les réflexes qu'on a vus aujourd'hui — voir la ligne de tir, garder les mains dégagées, porter le bon gant, et arrêter quand il le faut. La sécurité des mains, c'est l'affaire de chacun, à chaque quart, à chaque geste. Merci de votre attention et de votre engagement. Je prends vos questions.",
      ],
      demandez: "Ouvrir la discussion — questions et échanges.",
      retenir: "On rentre tous à la maison avec nos deux mains.",
    },
  ],
};
