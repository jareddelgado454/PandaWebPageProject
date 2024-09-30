import Image from "next/image";
import React from "react";
import { FiArrowRight } from "react-icons/fi"; // Importamos el ícono para la redirección

const Team = () => {
  return (
    <div
      className="w-full flex justify-center py-2 px-4 bg-gradient-to-b from-meant to-meantDark"
      id="Team-Section"
    >
      <div className="flex w-[80%] justify-center items-center flex-wrap text-darkBlack xl:mt-6">
        <div className="w-full flex flex-row gap-2 items-center mt-6 mb-10">
          <p className="text-darkBlack font-semibold text-xs xl:text-lg">
            Look Our
          </p>
          <p className="font-chackra text-2xl xl:text-6xl 2xl:text-7xl font-black ">
            Team
          </p>
        </div>

        {/* Contenedor de las cards usando Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full mb-16">
          {/* Card 1 con borde personalizado */}
          <div className="relative p-[2px] bg-gradient-to-br from-midgray to-darkblack rounded-xl">
            <div className="flex flex-col bg-meantExtraDark rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl overflow-hidden">
              <div className="overflow-hidden w-full rounded-t-xl">
                <Image
                  src={"/image/Team/Charles.jpg"}
                  width={400}
                  height={350}
                  alt="Panda_Charles_Mims"
                  className="object-cover h-[350px] w-full transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="flex flex-col px-4 py-4">
                <p className="font-chackra text-[25px] font-semibold text-lightWhite">
                  Charles Mims
                </p>
                <p className="font-chackra text-[18px] text-zinc-300">CEO</p>
                <hr className="w-full border-t border-midMeant my-2" />
                <button className="flex items-center gap-2 text-sm text-[#E6D5C9]/80 hover:text-[#E6D5C9]">
                  View Contact <FiArrowRight className="text-xl" />
                </button>
              </div>
            </div>
          </div>

          {/* Aquí puedes seguir replicando la misma estructura para las otras cards */}
          
          <div className="relative p-[2px] bg-gradient-to-br from-midgray to-darkblack rounded-xl">
            <div className="flex flex-col bg-meantExtraDark rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl">
              <div className="overflow-hidden w-full rounded-t-xl">
                <Image
                  src={"/image/Team/Neil.jpg"}
                  width={400}
                  height={350}
                  alt="Panda_Neil_Brown"
                  className="object-cover h-[350px] w-full transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="flex flex-col px-4 py-4">
                <p className="font-chackra text-[25px] font-semibold text-lightWhite">
                  Neil Brown
                </p>
                <p className="font-chackra text-[18px] text-zinc-300">CTO</p>
                <hr className="w-full border-t border-midMeant my-2" />
                <button className="flex items-center gap-2 text-sm text-[#E6D5C9]/80 hover:text-[#E6D5C9]">
                  View Contact <FiArrowRight className="text-xl" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative p-[2px] bg-gradient-to-br from-midgray to-darkblack rounded-xl">
            <div className="flex flex-col bg-meantExtraDark rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl">
              <div className="overflow-hidden w-full rounded-t-xl">
                <Image
                  src={"/image/Team/Jared.webp"}
                  width={400}
                  height={350}
                  alt="Panda_Jared_Delgado"
                  className="object-cover h-[350px] w-full transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="flex flex-col px-4 py-4">
                <p className="font-chackra text-[25px] font-semibold text-lightWhite">
                  Jared Delgado
                </p>
                <p className="font-chackra text-[18px] text-zinc-300">Developer</p>
                <hr className="w-full border-t border-midMeant my-2" />
                <button className="flex items-center gap-2 text-sm text-[#E6D5C9]/80 hover:text-[#E6D5C9]">
                  View Contact <FiArrowRight className="text-xl" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="relative p-[2px] bg-gradient-to-br from-midgray to-darkblack rounded-xl">
            <div className="flex flex-col bg-meantExtraDark rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl">
              <div className="overflow-hidden w-full rounded-t-xl">
                <Image
                  src={"/image/Team/David.webp"}
                  width={400}
                  height={350}
                  alt="Panda_Elio_David"
                  className="object-cover h-[350px] w-full transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="flex flex-col px-4 py-4">
                <p className="font-chackra text-[25px] font-semibold text-lightWhite">
                  Elio David
                </p>
                <p className="font-chackra text-[18px] text-zinc-300">Developer</p>
                <hr className="w-full border-t border-midMeant my-2" />
                <button className="flex items-center gap-2 text-sm text-[#E6D5C9]/80 hover:text-[#E6D5C9]">
                  View Contact <FiArrowRight className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
