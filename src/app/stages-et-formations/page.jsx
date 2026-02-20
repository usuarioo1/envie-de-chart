'use client';
import { useState } from 'react';
import Image from 'next/image';
import StageInquiryModal from '@/components/StageInquiryModal';

export default function StagesEtFormationsPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedFormation, setSelectedFormation] = useState({ number: 0, title: '' });

    const openModal = (number, title) => {
        setSelectedFormation({ number, title });
        setModalOpen(true);
    };

    return (
        <div className="bg-gradient-to-b from-[#ABA0F2]/10 via-white to-[#F2B988]/20 min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <div className="flex items-center justify-center mb-6">
                    <Image
                        src="/assets/icon/icono.png"
                        alt="Logo"
                        width={60}
                        height={60}
                        className="object-contain"
                    />
                </div>

                <h1 className="text-4xl font-bold mb-8 text-slate-900 text-center">
                    Stages et Formations
                </h1>

                {/* Formation 1 */}
                <div className="mb-12 p-8 bg-white rounded-3xl border-2 border-[#F2B988] shadow-lg">
                    <h2 className="text-3xl font-bold mb-6 text-[#F25A38] text-center">
                        Envie de chanter ? 1er degré de psychophonie
                    </h2>

                    <h3 className="text-2xl font-bold mb-4 text-slate-900 text-center tracking-wider">
                        N O U S &nbsp; S O M M E S &nbsp; T O U S &nbsp; C H A N T E U R S .
                    </h3>

                    <h4 className="text-xl font-semibold mb-6 text-[#F29057] text-center tracking-wide">
                        MON &nbsp; C O R P S &nbsp; E S T &nbsp; MON &nbsp; I N S T R U M E N T &nbsp; D E &nbsp; M U S I Q U E
                    </h4>

                    <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                        C'est une approche auto-expérimentale : nous allons à la découverte des possibilités de notre corps - instrument de musique, dans l'émission sonore et la réceptivité.
                    </p>

                    <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                        Alternance de théorie et de pratique en se référant aux découvertes et recherches de Marie-Louise Aucher.
                    </p>

                    <p className="text-md text-slate-600 mb-8 italic">
                        support du piano
                    </p>

                    <div className="mt-8 p-6 bg-[#F2B988]/10 rounded-2xl border border-[#F29057]">
                        <h4 className="text-2xl font-bold mb-4 text-slate-900 tracking-wider">
                            C O N T E N U
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <span className="text-[#F25A38] font-bold text-xl mt-1">-</span>
                                <span className="text-slate-700 text-lg">comprendre le phénomène vocal</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#F25A38] font-bold text-xl mt-1">-</span>
                                <span className="text-slate-700 text-lg">favoriser la maîtrise de la voix</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#F25A38] font-bold text-xl mt-1">-</span>
                                <span className="text-slate-700 text-lg">affiner la réceptivité tactile aux sons</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#F25A38] font-bold text-xl mt-1">-</span>
                                <span className="text-slate-700 text-lg">maitriser sa voix pour une meilleure gestion de ses émotions</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#F25A38] font-bold text-xl mt-1">-</span>
                                <span className="text-slate-700 text-lg">relation entre le corps et les fréquences sonores</span>
                            </li>
                        </ul>
                    </div>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => openModal(1, 'NOUS SOMMES TOUS CHANTEURS - MON CORPS EST MON INSTRUMENT DE MUSIQUE')}
                            className="px-6 py-3 bg-[#F25A38] text-white font-semibold rounded-full hover:bg-[#732514] transition-colors shadow-md"
                        >
                            Soliciter plus d'information
                        </button>
                    </div>
                </div>

                {/* Formation 2 */}
                <div className="mb-12 p-8 bg-white rounded-3xl border-2 border-[#F2B988] shadow-lg">
                    <h2 className="text-3xl font-bold mb-6 text-[#F25A38] text-center">
                        2ème degré de psychophonie
                    </h2>

                    <h3 className="text-2xl font-bold mb-3 text-slate-900 text-center tracking-wide">
                        NOUS SOMMES TOUS CHANTEURS.
                    </h3>

                    <h4 className="text-xl font-semibold mb-6 text-[#F29057] text-center">
                        NOTRE CORPS EST NOTRE INSTRUMENT DE MUSIQUE
                    </h4>

                    <div className="mb-6 p-6 bg-[#ABA0F2]/10 rounded-2xl border border-[#ABA0F2]">
                        <h5 className="text-xl font-bold mb-3 text-slate-900">OBJECTIF</h5>
                        <p className="text-lg text-slate-700 leading-relaxed">
                            Approfondir le travail corporel vocal. Chanter ensemble des chants polyphoniques. Composer de façon ludique des créations poétiques. Comprendre l'influence des rythmes corporels sur l'interprétation, les ressentir, se les approprier.
                        </p>
                    </div>

                    <div className="p-6 bg-[#F2B988]/10 rounded-2xl border border-[#F29057]">
                        <h5 className="text-xl font-bold mb-4 text-slate-900">CONTENU</h5>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <span className="text-[#F25A38] font-bold text-xl mt-1">-</span>
                                <span className="text-slate-700 text-lg">Reprendre les exercices sur les points du chanteur de Marie-Louise Aucher.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#F25A38] font-bold text-xl mt-1">-</span>
                                <span className="text-slate-700 text-lg">Travailler la parole sur la base des traditions orales et de la Psychophonie.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#F25A38] font-bold text-xl mt-1">-</span>
                                <span className="text-slate-700 text-lg">Pratiquer un répertoire de chants simples et polyphonique</span>
                            </li>
                        </ul>
                    </div>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => openModal(2, '2ème degré de psychophonie')}
                            className="px-6 py-3 bg-[#F25A38] text-white font-semibold rounded-full hover:bg-[#732514] transition-colors shadow-md text-lg"
                        >
                            Soliciter plus d'information
                        </button>
                    </div>
                </div>

                {/* Formation 3 - Chant Prénatal */}
                <div className="mb-12 p-8 bg-white rounded-3xl border-2 border-[#F2B988] shadow-lg">
                    <h2 className="text-3xl font-bold mb-6 text-[#F25A38] text-center">
                        Formation chant prénatal
                    </h2>

                    <div className="mb-6 p-6 bg-gradient-to-r from-[#ABA0F2]/20 to-[#F2B988]/20 rounded-2xl border border-[#F2B988]">
                        <p className="text-lg text-slate-700 leading-relaxed mb-4">
                            <strong>Chanter pendant la grossesse et après la naissance</strong> permet d'accompagner les changements du corps de la femme.
                        </p>
                        <p className="text-lg text-slate-700 leading-relaxed mb-4">
                            Avec des vocalises, nous travaillons la respiration, la tonicité musculaire, la dynamique des appuis, pour favoriser le bien être et accompagner les étapes successives de la grossesse, l'accouchement et le post-natal.
                        </p>
                        <p className="text-lg text-slate-700 leading-relaxed mb-4">
                            Les chansons participent à la relation avec le bébé. Tous ces moments peuvent être partagés avec le papa.
                        </p>
                        <p className="text-lg text-slate-700 leading-relaxed mb-4">
                            La formation au chant prénatal permet de découvrir le potentiel méconnu de la voix en lien avec la maternité.
                        </p>
                        <p className="text-lg text-slate-700 leading-relaxed">
                            La formation alterne en permanence théorie et pratique et s'appuie sur l'anatomie et la physiologie.
                        </p>
                    </div>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => openModal(3, 'Formation chant prénatal')}
                            className="px-6 py-3 bg-[#F25A38] text-white font-semibold rounded-full hover:bg-[#732514] transition-colors shadow-md text-lg"
                        >
                            Soliciter plus d'information
                        </button>
                    </div>
                </div>

                {/* Formation 4 - Musique et Jeunes Enfants */}
                <div className="mb-12 p-8 bg-white rounded-3xl border-2 border-[#F2B988] shadow-lg">
                    <h2 className="text-3xl font-bold mb-6 text-[#F25A38] text-center">
                        Formation musique et petite enfance
                    </h2>

                    <div className="p-6 bg-[#F2B988]/10 rounded-2xl border border-[#F29057]">
                        <p className="text-lg text-slate-700 leading-relaxed mb-4">
                            <strong>La musique fait partie intégrante de la vie</strong>, particulièrement pour les jeunes enfants. Elle est vecteur de communication, peut accompagner toute activité. Elle permet de s'exprimer et de libérer des émotions. Elle est riche de découvertes sensorielles et participe au développement des tout-petits.
                        </p>
                        <p className="text-lg text-slate-700 leading-relaxed">
                            Il n'est pas nécessaire d'être musicien. Nous abordons au cours de la formation les paramètres musicaux ; chacun repérera individuellement les thèmes qu'il souhaite développer et approfondir. Il s'agit d'affiner ses qualités musicales et pédagogiques.
                        </p>
                    </div>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => openModal(4, 'Formation musique et petite enfance')}
                            className="px-6 py-3 bg-[#F25A38] text-white font-semibold rounded-full hover:bg-[#732514] transition-colors shadow-md text-lg"
                        >
                            Soliciter plus d'information
                        </button>
                    </div>
                </div>

                {/* Formation 5 - Psychophonie et Pédagogie */}
                <div className="mb-12 p-8 bg-white rounded-3xl border-2 border-[#F2B988] shadow-lg">
                    <h2 className="text-3xl font-bold mb-6 text-[#F25A38] text-center">
                        Pédagogie de la psychophonie
                    </h2>

                    <div className="mb-6 p-6 bg-[#ABA0F2]/10 rounded-2xl border border-[#ABA0F2]">
                        <h4 className="text-xl font-bold mb-4 text-slate-900">SUJETS</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <span className="text-[#F25A38] font-bold text-xl mt-1">-</span>
                                <span className="text-slate-700 text-lg">Originalité et spécificités de la Psychophonie,</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#F25A38] font-bold text-xl mt-1">-</span>
                                <span className="text-slate-700 text-lg">Détail des choix pédagogiques,</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#F25A38] font-bold text-xl mt-1">-</span>
                                <span className="text-slate-700 text-lg">Construction d'une séance, rigueur et souplesse du pédagogue,</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#F25A38] font-bold text-xl mt-1">-</span>
                                <span className="text-slate-700 text-lg">Analyse d'une chanson.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="p-6 bg-[#F2B988]/10 rounded-2xl border border-[#F29057]">
                        <h4 className="text-xl font-bold mb-4 text-slate-900">CONTENU</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <span className="text-[#F25A38] font-bold text-xl mt-1">-</span>
                                <span className="text-slate-700 text-lg">Mise en pratique de la pédagogique des points du chanteur,</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#F25A38] font-bold text-xl mt-1">-</span>
                                <span className="text-slate-700 text-lg">Animer une séance ou une séquence,</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#F25A38] font-bold text-xl mt-1">-</span>
                                <span className="text-slate-700 text-lg">Intégrer un chant par le "pompage" des résonances,</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#F25A38] font-bold text-xl mt-1">-</span>
                                <span className="text-slate-700 text-lg">Adapter et composer des exercices vocaux,</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#F25A38] font-bold text-xl mt-1">-</span>
                                <span className="text-slate-700 text-lg">S'exercer à mener des séances d'éveil vocal.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => openModal(5, 'Pédagogie de la psychophonie')}
                            className="px-6 py-3 bg-[#F25A38] text-white font-semibold rounded-full hover:bg-[#732514] transition-colors shadow-md text-lg"
                        >
                            Soliciter plus d'information
                        </button>
                    </div>
                </div>

                {/* Formation 6 - Djembé */}
                <div className="mb-12 p-8 bg-white rounded-3xl border-2 border-[#F2B988] shadow-lg">
                    <h2 className="text-3xl font-bold mb-6 text-[#F25A38] text-center">
                        Journée sur l'accompagnement de chansons au djembé
                    </h2>

                    <div className="p-6 bg-gradient-to-r from-[#F2B988]/10 to-[#ABA0F2]/10 rounded-2xl border border-[#F29057]">
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <span className="text-[#F25A38] font-bold text-xl mt-1">•</span>
                                <span className="text-slate-700 text-lg">Découvrir les sons de base du djembé - Préparer la voix</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#F25A38] font-bold text-xl mt-1">•</span>
                                <span className="text-slate-700 text-lg">Apprendre des chants</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#F25A38] font-bold text-xl mt-1">•</span>
                                <span className="text-slate-700 text-lg">Les accompagner rythmiquement</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#F25A38] font-bold text-xl mt-1">•</span>
                                <span className="text-slate-700 text-lg">Associer chant et djembé</span>
                            </li>
                        </ul>
                        <p className="text-lg text-slate-600 mt-5 italic">
                            Plusieurs possibilités sont données pour que chacun puisse jouer selon ses capacités
                        </p>
                    </div>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => openModal(6, 'Accompagnement de chansons au djembé')}
                            className="px-6 py-3 bg-[#F25A38] text-white font-semibold rounded-full hover:bg-[#732514] transition-colors shadow-md text-lg"
                        >
                            Soliciter plus d'information
                        </button>
                    </div>
                </div>

                {/* Formation 8 - Formation Avancée Psychophonie */}
                <div className="mb-12 p-8 bg-white rounded-3xl border-2 border-[#F2B988] shadow-lg">
                    <h2 className="text-3xl font-bold mb-6 text-[#F25A38] text-center">
                        Formation avancée en psychophonie
                    </h2>

                    <div className="p-6 bg-[#ABA0F2]/10 rounded-2xl border border-[#ABA0F2]">
                        <p className="text-lg text-slate-700 leading-relaxed mb-4">
                            <strong>Cette formation s'adresse aux personnes ayant participé au stage de pédagogie de la psychophonie.</strong>
                        </p>
                        <p className="text-lg text-slate-700 leading-relaxed mb-5">
                            Elle reprend la pédagogie générale, la didactique, l'organisation d'une séance en développant les grands thèmes de la psychophonie :
                        </p>
                        <ul className="space-y-3 mb-5">
                            <li className="flex items-start gap-3">
                                <span className="text-[#F25A38] font-bold text-xl mt-1">-</span>
                                <span className="text-slate-700 text-lg">L'échelle des résonances</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#F25A38] font-bold text-xl mt-1">-</span>
                                <span className="text-slate-700 text-lg">Les constituants acoustiques de la voix</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#F25A38] font-bold text-xl mt-1">-</span>
                                <span className="text-slate-700 text-lg">Les points du chanteur</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#F25A38] font-bold text-xl mt-1">-</span>
                                <span className="text-slate-700 text-lg">La décontraction et la relaxation</span>
                            </li>
                        </ul>
                        <p className="text-lg text-slate-700 leading-relaxed">
                            Toute la formation s'appuie sur des travaux pratiques en situation afin de transmettre cet enseignement en atelier.
                        </p>
                    </div>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => openModal(8, 'Formation avancée en psychophonie')}
                            className="px-6 py-3 bg-[#F25A38] text-white font-semibold rounded-full hover:bg-[#732514] transition-colors shadow-md text-lg"
                        >
                            Soliciter plus d'information
                        </button>
                    </div>
                </div>

                {/* Formation 10 - Clochettes Montessori */}
                <div className="mb-12 p-8 bg-white rounded-3xl border-2 border-[#F2B988] shadow-lg">
                    <h2 className="text-3xl font-bold mb-6 text-[#F25A38] text-center">
                        Les clochettes Montessori : les jouer et les enseigner
                    </h2>

                    <div className="p-6 bg-[#F2B988]/10 rounded-2xl border border-[#F29057]">
                        <p className="text-lg text-slate-700 leading-relaxed mb-4">
                            Les clochettes Montessori constituent un instrument permettant d'isoler le sens de l'audition en le travaillant sans que n'interfèrent la vue et le toucher. Chaque clochette produit un son différent tout en étant identique visuellement.
                        </p>
                        <p className="text-lg text-slate-700 leading-relaxed mb-4">
                            Ce stage est l'occasion de découvrir cet instrument unique et original afin d'en jouer avec aisance pour pouvoir le jouer et l'enseigner.
                        </p>
                        <p className="text-lg text-slate-700 leading-relaxed mb-4">
                            Pour l'expérimenter et le développer, il y a tout un répertoire d'exercices et de jeux.
                        </p>
                        <p className="text-lg text-slate-900 font-semibold">
                            Formation ouverte à tous.
                        </p>
                    </div>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => openModal(10, 'Les clochettes Montessori : les jouer et les enseigner')}
                            className="px-6 py-3 bg-[#F25A38] text-white font-semibold rounded-full hover:bg-[#732514] transition-colors shadow-md text-lg"
                        >
                            Soliciter plus d'information
                        </button>
                    </div>
                </div>
            </div>

            <StageInquiryModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                formationNumber={selectedFormation.number}
                formationTitle={selectedFormation.title}
                source="stages-et-formations"
            />
        </div>
    );
}
