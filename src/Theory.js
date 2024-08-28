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
            <h3 className="text-xl font-bold mb-4">Teoría del Operador Laplaciano</h3>
            <div className="border border-gray-200 rounded-lg">
                <AccordionItem title="¿Qué es el Operador Laplaciano?">
                    <p>El Operador Laplaciano es una técnica de procesamiento de imágenes utilizada para la detección de bordes. Este operador calcula la segunda derivada de la intensidad de la imagen, lo que permite detectar áreas de cambio rápido en la intensidad, como bordes y detalles finos.</p>
                </AccordionItem>

                <AccordionItem title="Fundamentos Matemáticos">
                    <p>El proceso del Operador Laplaciano incluye los siguientes pasos fundamentales:</p>
                    <ol className="list-decimal list-inside">
                        <li>Aplicación de un filtro para reducir el ruido (opcional).</li>
                        <li>Cálculo de la segunda derivada de la imagen utilizando el Operador Laplaciano.</li>
                        <li>Identificación de bordes basados en cambios en la segunda derivada.</li>
                        <li>Posible post-procesamiento para eliminar bordes falsos o no deseados.</li>
                    </ol>
                </AccordionItem>

                <AccordionItem title="Proceso de Aplicación">
                    <ol className="list-decimal list-inside">
                        <li>Suavizado de la imagen (si es necesario) para reducir el ruido.</li>
                        <li>Aplicación del Operador Laplaciano para calcular la segunda derivada.</li>
                        <li>Identificación de bordes a través de la detección de cambios significativos en la intensidad.</li>
                        <li>Post-procesamiento para mejorar la detección de bordes si es necesario.</li>
                    </ol>
                </AccordionItem>

                <AccordionItem title="Ventajas y Desventajas">
                    <h4 className="font-semibold">Ventajas:</h4>
                    <ul className="list-disc list-inside mb-2">
                        <li>Detecta bordes con alta sensibilidad a cambios de intensidad.</li>
                        <li>Puede detectar detalles finos y bordes en diversas direcciones.</li>
                        <li>Sencillo de implementar en comparación con métodos más complejos.</li>
                    </ul>
                    <h4 className="font-semibold">Desventajas:</h4>
                    <ul className="list-disc list-inside">
                        <li>Más sensible al ruido debido al cálculo de la segunda derivada.</li>
                        <li>Puede producir bordes falsos si la imagen no ha sido suavizada adecuadamente.</li>
                    </ul>
                </AccordionItem>

                <AccordionItem title="Aplicaciones Prácticas">
                    <p>El Operador Laplaciano se utiliza en diversas aplicaciones de procesamiento de imágenes y visión por computadora, incluyendo:</p>
                    <ul className="list-disc list-inside">
                        <li>Segmentación de imágenes para identificar estructuras y bordes</li>
                        <li>Realce de detalles en imágenes científicas y médicas</li>
                        <li>Procesamiento de imágenes satelitales</li>
                        <li>Detección de características en imágenes de alta resolución</li>
                        <li>Análisis de texturas en imágenes digitales</li>
                    </ul>
                </AccordionItem>

                <AccordionItem title="Comparación con Otros Operadores">
                    <p>El Operador Laplaciano es uno de varios métodos de detección de bordes. Otros operadores comunes incluyen:</p>
                    <ul className="list-disc list-inside">
                        <li>Operador Sobel: Calcula el gradiente de la imagen para detectar bordes.</li>
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