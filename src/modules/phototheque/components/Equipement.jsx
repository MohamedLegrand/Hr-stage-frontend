export default function Equipement({ onImageClick }) {
  const equipements = [
    {
      id: 1,
      titre: "Écran 64 pouces",
      description: "Écran géant pour les présentations et réunions",
      image: "/images/phototheque/equipement/ecran.jpg"
    },
    {
      id: 2,
      titre: "Ordinateur de bureau",
      description: "Station de travail puissante pour les développeurs",
      image: "/images/phototheque/equipement/ordinateur-bureau.jpg"
    },
    {
      id: 3,
      titre: "Ordinateur portable",
      description: "PC portable haute performance pour la mobilité",
      image: "/images/phototheque/equipement/ordinateur-portable.jpg"
    },
    {
      id: 4,
      titre: "Mini imprimante",
      description: "Impression rapide et compacte",
      image: "/images/phototheque/equipement/imprimante.jpg"
    },
    {
      id: 5,
      titre: "Vidéo projecteur 4K",
      description: "Projecteur haute définition pour les formations",
      image: "/images/phototheque/equipement/projecteur.jpg"
    }
  ];

  return (
    <section id="equipement" className="py-16 px-4 max-w-6xl mx-auto bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          💻 Nos équipements informatiques
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Du matériel moderne et performant pour des conditions de travail optimales
        </p>
        <div className="w-24 h-1 bg-purple-600 mx-auto mt-4 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {equipements.map((equipement) => (
          <div
            key={equipement.id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
            onClick={() => onImageClick({ ...equipement, type: "equipement" })}
          >
            <div className="relative h-56 overflow-hidden bg-gradient-to-br from-purple-100 to-purple-200">
              <img
                src={equipement.image}
                alt={equipement.titre}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                onError={(e) => {
                  e.target.src = "https://placehold.co/400x300?text=Photo+à+venir";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
            </div>
            <div className="p-5">
              <h3 className="font-bold text-xl text-gray-800 mb-2">{equipement.titre}</h3>
              <p className="text-gray-500 text-sm">{equipement.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}