"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Truck, Zap, LayoutGrid } from "lucide-react";

export function FeatureSection({ lang }: { lang: 'fr' | 'ma' | 'en' }) {
  const features = {
    fr: [
      { title: "Certifié NF", desc: "Produits conformes aux normes de sécurité et incendie européennes.", icon: ShieldCheck },
      { title: "Logistique Rapide", desc: "Livraison sécurisée sur tout le territoire français.", icon: Truck },
      { title: "Performance RT2020", desc: "Optimisation de l'isolation thermique et acoustique.", icon: Zap },
      { title: "Prêt à Peindre", desc: "Finition parfaite pour une intégration invisible.", icon: LayoutGrid }
    ],
    ma: [
      { title: "Qualité Sinca", desc: "Produits de premier choix pour le marché marocain.", icon: ShieldCheck },
      { title: "Stock Local", desc: "Disponibilité immédiate à Casablanca et Bouskoura.", icon: Truck },
      { title: "Prix m2 Direct", desc: "Les tarifs les plus compétitifs sans intermédiaires.", icon: Zap },
      { title: "Sur Mesure", desc: "Fabrication personnalisée pour vos chantiers spécifiques.", icon: LayoutGrid }
    ],
    en: [
      { title: "Global Standards", desc: "High-quality panels matching international construction codes.", icon: ShieldCheck },
      { title: "Worldwide Shipping", desc: "Reliable export services for global infrastructure projects.", icon: Truck },
      { title: "Superior Craft", desc: "Precision engineering for maintenance and access.", icon: Zap },
      { title: "Versatile Fit", desc: "Modular designs for ceiling, walls, and technical shafts.", icon: LayoutGrid }
    ]
  }[lang];

  return (
    <section className="py-32 bg-slate-950 relative" id="features">
       <div className="container mx-auto px-6">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-8 border border-amber-500/20 group hover:bg-amber-500 transition-all">
                  <feature.icon className="text-amber-500 group-hover:text-slate-950 transition-colors" size={32} />
                </div>
                <h4 className="text-xl font-black text-white mb-4 tracking-tight">{feature.title}</h4>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
         </div>
       </div>
    </section>
  );
}
