export default function Bureaux({ onImageClick }) {
  const bureaux = [
    {
      id: 1,
      titre: "Salle de formation",
      description: "Salle équipée pour les formations",
      image: "/images/phototheque/bureaux/salle-formation.jpg"
    },
    {
      id: 2,
      titre: "Espace de travail collaboratif",
      description: "Open space moderne pour travailler en équipe",
      image: "/images/phototheque/bureaux/open-space.jpg"
    },
    {
      id: 3,
      titre: "Espace détente",
      description: "Pause café et convivialité",
      image: "/images/phototheque/bureaux/espace-detente.jpg"
    }
  ];

  return (
    <section id="bureaux" className="py-16 px-4 max-w-6xl mx-auto bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          🏢 Nos espaces
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Découvrez nos espaces de travail modernes et conviviaux
        </p>
        <div className="w-24 h-1 bg-purple-600 mx-auto mt-4 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bureaux.map((bureau) => (
          <div
            key={bureau.id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
            onClick={() => onImageClick({ ...bureau, type: "bureaux" })}
          >
            <div className="relative h-64 overflow-hidden bg-gradient-to-br from-purple-100 to-purple-200">
              <img
                src={bureau.image}
                alt={bureau.titre}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                onError={(e) => {
                  e.target.src = "https://placehold.co/400x400?text=Photo+à+venir";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
            </div>
            <div className="p-5 text-center">
              <h3 className="font-bold text-xl text-gray-800 mb-2">{bureau.titre}</h3>
              <p className="text-gray-500 text-sm">{bureau.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}