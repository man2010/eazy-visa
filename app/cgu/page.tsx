"use client";
import { motion } from 'motion/react';
import { useState } from 'react';
import HeroCarousel from '@/components/HeroCarousel';
import { FileText, Shield, AlertCircle, CheckCircle, Scale, User, Lock } from 'lucide-react';

export default function CGUPage() {
  const [activeSection, setActiveSection] = useState(0);

  const heroImages = [
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMHRyYXZlbHxlbnwxfHx8fDE3NjU4Njc3NjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBwYXNzcG9ydHxlbnwxfHx8fDE3NjU5ODk3OTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1765810655669-dced65717cd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRyYXZlbCUyMG9mZmljZXxlbnwxfHx8fDE3NjU5ODk4MDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  ];

  const sections = [
    {
      icon: FileText,
      title: '1. Objet et Acceptation',
      content: `Les présentes Conditions Générales d'Utilisation (CGU) régissent l'ensemble des relations entre Eazy-Visa, société de droit sénégalais, et ses clients dans le cadre de l'utilisation de ses services de billetterie, réservation d'hôtels, assistance visa et autres prestations connexes.
      
En accédant à notre site web www.eazy-visa.com ou en utilisant nos services, vous acceptez sans réserve les présentes CGU. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.

Ces CGU constituent un contrat juridiquement contraignant entre vous et Eazy-Visa. Nous nous réservons le droit de modifier ces conditions à tout moment, les modifications prenant effet dès leur publication sur notre site.`
    },
    {
      icon: Shield,
      title: '2. Services Proposés',
      content: `Eazy-Visa propose une gamme complète de services pour faciliter vos voyages :

**2.1 Vente de Billets d'Avion**
• Recherche et comparaison de vols auprès de nombreuses compagnies aériennes
• Réservation et émission de billets électroniques
• Modifications et annulations selon les conditions tarifaires
• Assistance en cas de changements de vol

**2.2 Réservation d'Hôtels**
• Sélection d'hébergements dans le monde entier
• Comparaison des tarifs et des prestations
• Réservation sécurisée avec confirmation instantanée
• Support en cas de problème sur place

**2.3 Demande de Visa pour l'Allemagne**
• Accompagnement complet dans la constitution du dossier
• Vérification de tous les documents requis
• Prise de rendez-vous à l'ambassade
• Suivi personnalisé jusqu'à l'obtention du visa

**2.4 Assurance Voyage**
• Couverture médicale internationale
• Assistance rapatriement
• Assurance annulation et interruption de séjour
• Protection bagages et responsabilité civile

**2.5 Formation en Langue Allemande**
• Cours intensifs niveaux A1 à B2
• Préparation aux certifications officielles
• Enseignants qualifiés et méthodes modernes
• Cours en présentiel et à distance

**2.6 Accompagnement Installation en Allemagne**
• Accueil à l'aéroport
• Hébergement temporaire (1 mois offert)
• Assistance administrative et bancaire
• Orientation et intégration locale`
    },
    {
      icon: User,
      title: '3. Inscription et Compte Client',
      content: `**3.1 Création de Compte**
Pour bénéficier de nos services, vous pouvez créer un compte personnel sur notre site. Vous vous engagez à fournir des informations exactes, complètes et à jour.

**3.2 Sécurité du Compte**
Vous êtes responsable de la confidentialité de vos identifiants de connexion. Toute utilisation de votre compte est présumée avoir été effectuée par vous.

**3.3 Obligations du Client**
• Utiliser les services conformément aux lois en vigueur
• Fournir des informations véridiques
• Informer Eazy-Visa de tout changement dans vos coordonnées
• Ne pas utiliser les services à des fins frauduleuses

**3.4 Suspension et Résiliation**
Eazy-Visa se réserve le droit de suspendre ou de résilier votre accès aux services en cas de violation des présentes CGU ou de comportement frauduleux.`
    },
    {
      icon: CheckCircle,
      title: '4. Processus de Réservation',
      content: `**4.1 Recherche et Sélection**
Notre plateforme vous permet de rechercher et comparer les offres de vols et d'hôtels en temps réel. Les tarifs affichés sont susceptibles de varier en fonction de la disponibilité.

**4.2 Réservation**
Une fois votre sélection effectuée, vous devez renseigner les informations requises pour la réservation, incluant :
• Noms et prénoms des passagers (tels qu'ils apparaissent sur les documents d'identité)
• Dates de naissance
• Coordonnées de contact
• Préférences éventuelles (siège, repas, etc.)

**4.3 Vérification**
Il est de votre responsabilité de vérifier l'exactitude de toutes les informations avant de finaliser la réservation. Toute erreur pourrait entraîner des frais supplémentaires.

**4.4 Confirmation**
Vous recevrez une confirmation de réservation par email contenant tous les détails de votre voyage. Conservez précieusement cette confirmation.

**4.5 Délais de Réservation**
Pour les vols internationaux, nous recommandons de réserver au moins 72 heures avant le départ. Pour les demandes urgentes, des frais supplémentaires peuvent s'appliquer.`
    },
    {
      icon: Lock,
      title: '5. Paiement et Tarification',
      content: `**5.1 Prix et Devises**
Tous les prix sont affichés en Francs CFA (FCFA) et incluent les taxes applicables, sauf mention contraire. Les prix des billets d'avion et des hôtels sont susceptibles de varier jusqu'à la confirmation finale du paiement.

**5.2 Modes de Paiement Acceptés**
Eazy-Visa accepte les paiements via :
• Wave (sans frais supplémentaires)
• Orange Money (sans frais supplémentaires)
• Cartes bancaires (Visa, Mastercard)
• Espèces à notre guichet physique
• Virement bancaire (pour les entreprises)

**5.3 Sécurité des Paiements**
Toutes les transactions en ligne sont sécurisées par cryptage SSL. Nous ne conservons pas vos données bancaires.

**5.4 Frais de Service**
Des frais de service peuvent s'appliquer selon le type de prestation. Ces frais seront clairement indiqués avant la finalisation du paiement.

**5.5 Facturation**
Une facture détaillée vous sera fournie pour chaque transaction. Les entreprises peuvent bénéficier de conditions de facturation spécifiques via notre offre Corporate.`
    },
    {
      icon: AlertCircle,
      title: '6. Annulation et Modifications',
      content: `**6.1 Politique d'Annulation - Billets d'Avion**
Les conditions d'annulation dépendent du tarif choisi et des conditions de la compagnie aérienne :
• Tarifs flexibles : remboursement possible avec frais
• Tarifs économiques : modification possible avec supplément, remboursement limité
• Tarifs promotionnels : généralement non remboursables et non modifiables

**6.2 Modification de Billets**
Les modifications sont possibles selon les conditions tarifaires, moyennant :
• Des frais de modification Eazy-Visa
• La différence tarifaire éventuelle
• Les pénalités de la compagnie aérienne

**6.3 Annulation d'Hôtels**
Les conditions d'annulation varient selon l'établissement :
• Annulation gratuite jusqu'à 24-48h avant l'arrivée (selon l'hôtel)
• Après ce délai : prélèvement de la première nuit ou de la totalité du séjour

**6.4 Remboursements**
Les remboursements sont effectués sur le mode de paiement initial dans un délai de 14 à 30 jours ouvrés, selon les compagnies aériennes et les établissements.

**6.5 Force Majeure**
En cas de force majeure (catastrophe naturelle, épidémie, guerre, etc.), les conditions d'annulation peuvent être assouplies selon les circonstances.`
    },
    {
      icon: Shield,
      title: '7. Protection des Données Personnelles',
      content: `**7.1 Collecte des Données**
Nous collectons uniquement les données nécessaires à la fourniture de nos services :
• Données d'identification (nom, prénom, date de naissance)
• Coordonnées (email, téléphone, adresse)
• Informations de paiement (via prestataires sécurisés)
• Données de voyage (passeport, préférences)

**7.2 Utilisation des Données**
Vos données sont utilisées pour :
• Traiter vos réservations
• Vous contacter concernant vos voyages
• Améliorer nos services
• Vous informer de nos offres (avec votre consentement)

**7.3 Protection des Données**
Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données contre tout accès non autorisé, perte ou destruction.

**7.4 Partage des Données**
Vos données peuvent être partagées avec :
• Les compagnies aériennes et hôtels pour les réservations
• Les autorités consulaires pour les demandes de visa
• Nos partenaires de confiance (assurances, formation)
• Les autorités légales si requis par la loi

**7.5 Vos Droits**
Conformément à la réglementation en vigueur, vous disposez de droits sur vos données :
• Droit d'accès et de rectification
• Droit à l'effacement
• Droit d'opposition
• Droit à la portabilité

Pour exercer ces droits, contactez-nous à : contact@eazy-visa.com`
    },
    {
      icon: Scale,
      title: '8. Responsabilités',
      content: `**8.1 Responsabilité d'Eazy-Visa**
Eazy-Visa s'engage à fournir des services de qualité et à faire ses meilleurs efforts pour assurer la satisfaction de ses clients. Toutefois :
• Nous agissons en tant qu'intermédiaire entre vous et les prestataires (compagnies aériennes, hôtels, etc.)
• Nous ne pouvons être tenus responsables des modifications imposées par les prestataires
• Notre responsabilité est limitée au montant payé pour le service concerné

**8.2 Responsabilité du Client**
Le client est responsable de :
• La validité de ses documents de voyage (passeport, visa)
• L'exactitude des informations fournies
• Le respect des conditions d'entrée dans les pays visités
• Se présenter à temps aux aéroports et hôtels

**8.3 Documents de Voyage**
Il appartient au client de vérifier que ses documents sont valides et conformes aux exigences du pays de destination. Eazy-Visa décline toute responsabilité en cas de refus d'embarquement ou d'entrée pour documents non conformes.

**8.4 Retards et Annulations**
En cas de retard ou d'annulation par la compagnie aérienne, notre équipe vous assistera mais ne pourra être tenue responsable des préjudices subis.

**8.5 Bagages**
La responsabilité concernant les bagages relève des compagnies aériennes selon les conventions internationales.`
    },
    {
      icon: FileText,
      title: '9. Service Client 24/7',
      content: `**9.1 Disponibilité**
Notre engagement : un service client disponible 24 heures sur 24, 7 jours sur 7, y compris les week-ends et jours fériés.

**9.2 Canaux de Contact**
• Téléphone : +221 XX XXX XX XX
• Email : contact@eazy-visa.com
• WhatsApp : disponible 24/7
• Guichet physique : Lun-Dim 8h-18h (Cité Keur Gorgui)
• Chat en ligne : sur notre site web

**9.3 Temps de Réponse**
• Urgences : réponse immédiate (téléphone/WhatsApp)
• Emails : réponse sous 24h maximum
• Chat : réponse en temps réel pendant les heures de bureau

**9.4 Assistance d'Urgence**
En cas de problème pendant votre voyage (vol annulé, perte de bagages, etc.), notre équipe d'astreinte est disponible pour vous assister immédiatement.`
    },
    {
      icon: CheckCircle,
      title: '10. Droit Applicable et Litiges',
      content: `**10.1 Loi Applicable**
Les présentes CGU sont régies par le droit sénégalais. Tout litige relatif à leur interprétation ou à leur exécution relève de la compétence des tribunaux du Sénégal.

**10.2 Médiation**
Avant toute action judiciaire, les parties s'engagent à tenter de résoudre le litige à l'amiable. En cas d'échec, une médiation peut être mise en place.

**10.3 Réclamations**
Toute réclamation doit être adressée par écrit à :
Email : reclamations@eazy-visa.com
Courrier : Eazy-Visa, Cité Keur Gorgui, Immeuble Keur Mbaye Lô, Villa Nr 12, 11500 Dakar

**10.4 Délai de Réclamation**
Les réclamations doivent être formulées dans un délai raisonnable :
• Problèmes de réservation : dans les 7 jours
• Problèmes de facturation : dans les 30 jours
• Litiges voyage : dans les 2 mois suivant la date de retour

**10.5 Preuve des Transactions**
Les registres informatisés conservés dans les systèmes d'Eazy-Visa constituent des preuves des communications et transactions entre les parties.`
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#A11C1C] to-[#A11C1C] bg-clip-text text-transparent"
          >
            Conditions Générales d'Utilisation
          </motion.h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transparence et clarté sur nos engagements et vos droits
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-gray-500 mt-4"
          >
            Dernière mise à jour : 18 Décembre 2025
          </motion.p>
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-6">Navigation</h3>
              <nav className="space-y-2">
                {sections.map((section, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setActiveSection(index);
                      document.getElementById(`section-${index}`)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    whileHover={{ x: 5 }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                      activeSection === index
                        ? 'bg-[#A11C1C] text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <section.icon className="w-5 h-5" />
                    <span className="text-sm">{section.title}</span>
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                id={`section-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                onViewportEnter={() => setActiveSection(index)}
                className="bg-white rounded-2xl shadow-xl p-8 scroll-mt-24"
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-14 h-14 rounded-full bg-[#A11C1C] flex items-center justify-center"
                  >
                    <section.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>
                <div className="prose prose-lg max-w-none">
                  {section.content.split('\n\n').map((paragraph, pIndex) => (
                    <motion.p
                      key={pIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: pIndex * 0.05 }}
                      className="text-gray-600 leading-relaxed mb-4 whitespace-pre-line"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Footer Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#A11C1C]/5 to-[#A11C1C]/10 rounded-2xl p-8"
            >
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-[#A11C1C] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Questions sur nos CGU ?</h3>
                  <p className="text-gray-600 mb-4">
                    Notre équipe est disponible 24/7 pour répondre à toutes vos questions concernant nos conditions d'utilisation.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="mailto:contact@eazy-visa.com"
                      className="px-6 py-3 bg-[#A11C1C] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      Nous contacter
                    </a>
                    <a
                      href="tel:+221123456789"
                      className="px-6 py-3 border-2 border-[#A11C1C] text-[#A11C1C] rounded-lg font-semibold hover:bg-[#A11C1C]/5 transition-all"
                    >
                      Appeler maintenant
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}