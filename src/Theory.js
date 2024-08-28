import React, { useState } from 'react';

const Theory = () => {
    const AccordionItem = ({ title, children }) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <div className="border-b border-gray-200">
                <button
                className="flex justify-between items-center w-full py-4 px-6 text-left font-semibold"
                onClick={() => setIsOpen(!isOpen)}
                >
                {title}
                <span>{isOpen ? '▲' : '▼'}</span>
                </button>
                {isOpen && (
                <div className="py-4 px-6">
                    {children}
                </div>
                )}
            </div>
        );
    };
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Teoría del Operador Scharr</h3>
            <div className="border border-gray-200 rounded-lg">
                <AccordionItem title="¿Qué es el Operador Scharr?">
                    <p>El Operador Scharr es una técnica de procesamiento de imágenes utilizada para la detección de bordes. Este operador es una mejora del Operador Sobel, proporcionando una mayor precisión en la estimación de gradientes, lo que permite detectar bordes más finos y detalles más nítidos en las imágenes.</p>
                </AccordionItem>

                <AccordionItem title="Fundamentos Matemáticos">
                    <p>El proceso del Operador Scharr incluye los siguientes pasos fundamentales:</p>
                    <ol className="list-decimal list-inside">
                        <li>Aplicación de un filtro para reducir el ruido (opcional, pero recomendado).</li>
                        <li>Cálculo del gradiente de la imagen utilizando los kernels Scharr en las direcciones X e Y.</li>
                        <li>Combinación de los gradientes para obtener la magnitud y la dirección del borde.</li>
                        <li>Posible post-procesamiento para resaltar bordes importantes o suavizar bordes no deseados.</li>
                    </ol>
                </AccordionItem>

                <AccordionItem title="Proceso de Aplicación">
                    <ol className="list-decimal list-inside">
                        <li>Suavizado de la imagen (si es necesario) para reducir el ruido.</li>
                        <li>Aplicación del Operador Scharr en las direcciones X e Y para calcular los gradientes.</li>
                        <li>Combinación de los gradientes para determinar la magnitud del borde en cada punto.</li>
                        <li>Post-procesamiento para mejorar la detección de bordes si es necesario.</li>
                    </ol>
                </AccordionItem>

                <AccordionItem title="Ventajas y Desventajas">
                    <h4 className="font-semibold">Ventajas:</h4>
                    <ul className="list-disc list-inside mb-2">
                        <li>Ofrece una mayor precisión en la detección de bordes en comparación con Sobel.</li>
                        <li>Capaz de detectar detalles finos y bordes en diversas direcciones con alta precisión.</li>
                        <li>Adecuado para aplicaciones que requieren alta sensibilidad a los cambios de intensidad.</li>
                    </ul>
                    <h4 className="font-semibold">Desventajas:</h4>
                    <ul className="list-disc list-inside">
                        <li>Más complejo y computacionalmente costoso que el Operador Sobel.</li>
                        <li>Puede ser más sensible al ruido, requiriendo un filtrado previo.</li>
                    </ul>
                </AccordionItem>

                <AccordionItem title="Aplicaciones Prácticas">
                    <p>El Operador Scharr se utiliza en diversas aplicaciones de procesamiento de imágenes y visión por computadora, incluyendo:</p>
                    <ul className="list-disc list-inside">
                        <li>Detección de bordes en imágenes de alta resolución.</li>
                        <li>Segmentación de imágenes en análisis médicos y científicos.</li>
                        <li>Procesamiento de imágenes en tiempo real en sistemas de vigilancia.</li>
                        <li>Realce de detalles en imágenes satelitales y de teledetección.</li>
                        <li>Análisis de texturas en imágenes digitales complejas.</li>
                    </ul>
                </AccordionItem>

                <AccordionItem title="Comparación con Otros Operadores">
                    <p>El Operador Scharr es uno de varios métodos de detección de bordes. Otros operadores comunes incluyen:</p>
                    <ul className="list-disc list-inside">
                        <li>Operador Sobel: Similar a Scharr, pero con menos precisión en la detección de bordes.</li>
                        <li>Operador Prewitt: Similar al Sobel pero con diferente configuración de los kernels.</li>
                        <li>Operador Roberts: Utiliza kernels más pequeños y es más sensible al ruido.</li>
                        <li>Operador Canny: Método avanzado que maximiza la relación señal-ruido y reduce los bordes falsos.</li>
                    </ul>
                </AccordionItem>
            </div>
        </div>
    );
};

export default Theory;