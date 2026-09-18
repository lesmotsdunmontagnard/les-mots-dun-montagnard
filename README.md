# Les mots d’un montagnard — GitHub Pages

Site statique en français, sans WordPress, serveur PHP, base de données, publicité ou statistiques. L’aspect livre sur ordinateur et le texte qui recouvre l’image sur téléphone/tablette sont conservés. Actualités possède sa rubrique séparée. Aucun poème de démonstration n’est publié.

## Créer le dépôt et publier, lorsque vous êtes prêt

1. Sur GitHub, créez un nouveau dépôt nommé par exemple `les-mots-dun-montagnard`, avec la branche `main`. Le mode public convient à GitHub Pages ; attention, un dépôt public rend aussi ses fichiers sources et brouillons visibles.
2. Décompressez `les-mots-dun-montagnard-github.zip`. Envoyez **le contenu du dossier extrait à la racine du dépôt**, y compris le dossier caché `.github`, `assets`, `content`, `scripts` et `package.json`. N’envoyez pas le ZIP lui-même. Aucun fichier du thème WordPress n’est requis.
3. Dans **Settings → Pages → Build and deployment → Source**, choisissez **GitHub Actions**.
4. Dans **Actions → Publier le recueil**, lancez **Run workflow** si nécessaire. Les mises à jour ultérieures de `main` reconstruiront et publieront le site.
5. GitHub indiquera l’adresse publiée, généralement `https://VOTRE-COMPTE.github.io/les-mots-dun-montagnard/`. Les liens relatifs fonctionnent aussi avec un autre nom de dépôt ou un domaine personnalisé.

Le workflow fourni publie uniquement le dossier généré `public`. Les exemples visuels du dossier `demo` ne sont jamais envoyés à GitHub Pages. Aucun dépôt distant ni site public n’a été créé pendant cette conversion.

## Ajouter un poème

1. Créez `content/textes/mon-poeme.txt`, en UTF-8. Collez uniquement le poème, exactement, avec tous ses espaces et lignes vides. Aucun Markdown n’est interprété. Ne corrigez pas le texte pour sa mise en page.
2. Dans `content/poemes.json`, ajoutez une entrée à la liste. Exemple de **métadonnées seulement**, à remplacer :

```json
[
  {
    "id": "mon-poeme",
    "titre": "LE TITRE EXACT",
    "fichier": "textes/mon-poeme.txt",
    "themes": ["Montagnes"],
    "image": "assets/ma-photo.jpg",
    "descriptionImage": "Description de votre photographie",
    "date": "",
    "publie": true
  }
]
```

Les identifiants utilisent des minuscules sans accents, des chiffres et des tirets. Ils déterminent l’adresse permanente du poème ; le titre, lui, garde sa typographie exacte. Pour plusieurs entrées, séparez les objets par une virgule. Placez les nouveautés en tête de liste. Les thèmes sont libres et alimentent automatiquement les filtres.

Laissez `image` et `descriptionImage` vides pour un poème sans image. La date est facultative : vide pour la masquer, ou au format `2026-09-17`. `publie: false` exclut le texte des pages et de la recherche générées, mais ne le cache pas dans un dépôt public.

3. Placez vos photos dans `assets`. L’illustration générée précédemment est disponible sous `assets/illustration-exemple.png`, si vous voulez la choisir. Elle n’est utilisée automatiquement que dans l’aperçu de démonstration.
4. Enregistrez les changements sur GitHub (**Commit changes**). Le workflow reconstruit le site. Vérifiez la page et comparez le poème avec l’original.

La source `.txt` n’est ni traduite, ni corrigée, ni soumise à une substitution de ponctuation. Les pages contiennent le texte intégral dans un bloc préformaté avec retour à la ligne sur petit écran. Les fichiers sources sont séparés de la présentation et peuvent être transférés vers un autre hébergement.

## Ajouter une actualité

Créez son fichier texte dans `content/textes`, puis ajoutez ses métadonnées à **`content/actualites.json`** sur le même modèle. Le champ `themes` peut être omis. Les actualités ont une page de lecture classique et ne figurent jamais parmi les poèmes. L’ordre de la liste détermine l’ordre d’affichage.

## Accueil, images et À propos

- Modifiez `content/site.json` : `nom`, `introduction` facultative, `imageAccueil` facultative et `descriptionImageAccueil`.
- Pour le poème mis à l’honneur, donnez à `poemeALHonneur` l’identifiant d’un poème publié. Laissez vide pour masquer cette section.
- Remplacez `assets/logo.png` pour changer le logo. Les couleurs, polices et espacements sont dans `assets/site.css`.
- Écrivez votre propre texte dans `content/a-propos.txt`, puis passez `afficherAPropos` à `true` dans `site.json`. Tant que le texte est vide ou ce réglage désactivé, ni page À propos ni lien de navigation ne sont générés.

## Vérifier localement

Node.js 22 ou plus récent suffit. Aucune bibliothèque à installer.

```sh
node scripts/test.mjs
node scripts/build.mjs
node scripts/build.mjs --demo
node scripts/serve.mjs
```

Site réel : `http://127.0.0.1:8790/`. Aperçu avec emplacements : `http://127.0.0.1:8790/demo/`. Le préfixe `/recueil/` permet de tester les liens sous un nom de dépôt. Le site réel sera vide jusqu’à l’ajout de vos textes. Les pages, le menu et la pagination de base sont accessibles sans JavaScript ; la recherche et les filtres en ont besoin.

## Différence avec la version WordPress

GitHub Pages héberge des fichiers statiques et n’exécute pas PHP : il n’y a donc plus de tableau de bord WordPress ni de Site Editor. Le contenu se gère dans les fichiers du dépôt. Le thème WordPress précédent reste conservé séparément dans le dossier du projet, si vous souhaitez y revenir.

Documentation officielle : [Créer un site GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site), [Publier avec GitHub Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Classement des poèmes

Les 19 textes importés ont été classés par sujets après lecture. Ces catégories sont des interprétations éditoriales modifiables dans le champ `themes`, jamais des modifications des poèmes. Auteur, date et lieu proviennent de leur signature : 17 textes indiquent Djamel Metref, At Yenni et une date complète. Les deux textes « 4 septembre » ne fournissent ni signature, ni lieu, ni année ; leurs champs restent vides.

Chaque entrée accepte `auteur`, `lieu` et `date` (AAAA-MM-JJ). Pour un nouveau texte, omettez ces champs pour laisser le générateur détecter une signature de forme « Prénom Nom » suivie de « Lieu le 22 Août 2026 » à la fin du fichier. Une valeur explicite, y compris une chaîne vide, reste prioritaire. Les noms et lieux mentionnés dans les vers ne sont pas utilisés comme signature. Une date sans année n’est pas complétée arbitrairement. Les nouveaux sujets se renseignent dans `themes` ; cette version n’envoie aucun texte à un service d’IA et ne classe pas automatiquement les futurs sujets par mots-clés.

La collection permet de combiner recherche, sujet, auteur, lieu d’écriture et mois, puis de classer par date, titre, auteur ou lieu. Les textes sans date restent à la fin des classements chronologiques. « Non précisé » permet de retrouver les informations manquantes. Les liens de métadonnées sur chaque poème ouvrent le classement correspondant.

La signature et le titre présents dans les fichiers restent intégralement dans le texte original, même lorsqu’ils apparaissent aussi dans les métadonnées de la page.

## Crédit des images

Le champ `creditImage` de chaque poème affiche une attribution visible sur son image. Les photographies fournies sont créditées « Photographie © Djamel Metref », selon votre indication. Le tableau illustrant Fatna conserve « Œuvre © Reche Safia » ; l’affiche du congrès de la Soummam reste sans attribution photographique. Le crédit de la photographie d’accueil se modifie dans `creditImageAccueil`, dans `content/site.json`. Les fichiers photographiques originaux restent inchangés : le crédit est une légende sur le site, pas un filigrane intégré au fichier.

### Plusieurs images pour une actualité

Une actualité peut contenir un champ `images`, liste d’objets avec `image` (chemin dans assets), `description` (texte alternatif) et `legende`. La galerie apparaît après le titre ; chaque image dispose d’un lien Agrandir vers le fichier original. Consultez l’entrée « Virée poétique vers Milan » dans `content/actualites.json` comme modèle.
