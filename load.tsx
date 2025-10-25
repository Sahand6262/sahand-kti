import React from 'react'

const LOGO_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEX////mAADmAABTqlNJolf64ODmAwP86ur86+v11tbmBQXoFRXoERHnJSXqPz/ywcH99PTmDAzufoD99/fuamv229vnHR3rU1PznZ3wubnka2vtbm7pLzDwb3D44+Pyl5fqSEnsWVrtZmbqRUXuZWXlS+3aAAACyElEQVR4nO2d63KiMBCGQwghgIKi4sEFr/b//3IVL2tSSkmx2ezMOfcBWZvBJF1mEhUDAAAAAAAAAAAAAAAAAAAAAAAAAPjftD/S8mhH2zFtNts/aXk0J4h2jH+k5eHc2fT/uC5nK/1F5c+yPjL2x39S2V+o+0tZp7wP0z4jO6uH+y/bH2p3o0/M9l/afkofvM4+xP8P+C/s/5S90W9S/jL2F7P+UvaXsl/afmlrQJj2x7P+wvaXsi8s/V/W0/q5gD8x4d9iO39c/w+yP9HyV/QZ4z/S8mj+s+qP6Gf2F+M/0vJo/r8/Yd8/2d/of/z3/o/oX8b+Qv/30r6E/j9l/0L/G/v/yP6E/t/b/1L/W9t/qf8d+y/0P6//M/v/Qv9j/X9p/2P9n9v/X/o/sP8f+j+w/+/s/wv939n/V/rf1v+f+t/W/5/6P7D/r/Q/sP+f9B9q+jYnKx1e1nO3b934Xm14P7Xh/dSG91Mb3k9teD+14f3Uhnf7c2F/9P2t9S+N//fX/pX2n7L/Qv+T9T/S8mj+8P6N9R/o/0/Jo/nJ+8/YX8J+Sfkc+z/Q/1vJo/nJ+6ft32h/Z/0nJo/nJ+4ftL9X/jL+R8mj+Yn7N+2/sP+b/v8/Jo/mJ+7/0vJo/pT/Y/r/0vJo/pT/w/p/afl/X38i/3/9J/0f9f+s/wP9f+u/SP8f+p+2/wP9n7L/Af2ftv8D/T9p/w/6P2T/I/o/bP8f+j9s/5/of9D+P9H/Yfu/RP+z9h+x/1n7T9j/rP0f2/+s/S/S/2/736L/H+5/W99PzS+fBwAAAAAAAAAAAAAAAAAAAAAAAADgP/kDx8/JdO41c7oAAAAASUVORK5CYII='

interface SelectionPageProps {
  onSelect: (type: 'zansi' | 'wezhay') => void
}

export const SelectionPage: React.FC<SelectionPageProps> = ({ onSelect }) => {
  return (
    <div
      className="min-h-screen bg-white rtl flex flex-col items-center justify-center p-4 font-bold"
      dir="rtl"
    >
      <div className="text-center space-y-8 max-w-2xl mx-auto">
        <img
          src={LOGO_DATA_URL}
          alt="Logo"
          className="h-24 mx-auto mb-6 drop-shadow-lg"
        />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-wide">
          فۆڕمی تۆمارکردنی پەیمانگای تەکنیکی کوردستان
        </h1>
        <p className="text-lg text-gray-600">
          تکایە جۆری خوێندنەکەت هەڵبژێرە بۆ بەردەوامبوون.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onSelect('zansi')}
            className="w-full sm:w-64 bg-gradient-to-r from-[#0C8FCB] to-[#175988] hover:from-[#175988] hover:to-[#0C8FCB] text-white px-8 py-4 rounded-xl font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            زانستی
          </button>
          <button
            onClick={() => onSelect('wezhay')}
            className="w-full sm:w-64 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white px-8 py-4 rounded-xl font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            وێژەیی
          </button>
        </div>
      </div>
    </div>
  )
}
