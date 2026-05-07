"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const partners = [
  { name: 'Placo', logo: '/assets/img/clients/client-1.png' },
  { name: 'CMPE', logo: '/assets/img/clients/client-2.png' },
  { name: 'Lafarge', logo: '/assets/img/clients/client-3.png' },
  { name: 'Knauf', logo: '/assets/img/clients/client-4.png' },
  { name: 'Weber', logo: '/assets/img/clients/client-5.png' },
  { name: 'Gamma', logo: '/assets/img/clients/client-6.png' },
];

function Partners() {
  return (
    <section className="py-12 lg:py-24 bg-white border-y border-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-10 lg:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-green-500 mb-4"
          >
            Nos Partenaires
          </motion.h2>
          <div className="w-12 h-1 bg-green-500 mx-auto rounded-full opacity-20" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 items-center">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-center p-6 grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 transform hover:scale-110"
            >
              <div className="relative h-12 w-full">
                <Image 
                  src={partner.logo} 
                  alt={partner.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 33vw, (max-width: 1024px) 20vw, 15vw"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
