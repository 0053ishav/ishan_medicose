import React, { useEffect, useState } from "react";
import { fetchMedicalDetails } from "@/lib/appwrite";
import { Skeleton } from "@/components/ui/skeleton";

interface MedicalDetailsData {
  productId: string;
  name: string;
  description: string;
  features: string[];
  medicalUses: string;
  precautions: string[];
  manufacturer: string;
  dosage: string;
  expiryDate: string;
}

interface MedicalDetailsProps {
  productId: string;
}

const MedicalDetails: React.FC<MedicalDetailsProps> = ({ productId }) => {
  const [details, setDetails] = useState<MedicalDetailsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);

      try {
        const response = await fetchMedicalDetails(productId);

        const details = response.documents.find(
          (doc: any) => doc.productId === productId
        );

        if (details) {
          setDetails({
            productId: details.productId,
            name: details.name,
            description: details.description,
            features: details.features || [],
            medicalUses: details.medicalUses || "",
            precautions: details.precautions || [],
            manufacturer: details.manufacturer || "Unknown",
            dosage: details.dosage || "N/A",
            expiryDate: details.expiryDate || "N/A",
          });
        } else {
          setDetails(null);        }
      } catch (err) {
        console.error("Error fetching product details:", err);
        setDetails(null)
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [productId]);

  if (isLoading) {
    return (
      <div className="p-6 bg-white shadow-md rounded-md mt-12">
        <div className="border-b pb-4 mb-4">
          <Skeleton className="h-8 w-2/4" /> {/* Skeleton for product name */}
          <Skeleton className="h-5 w-3/4 mt-2" /> {/* Skeleton for product description */}
        </div>

        <div className="mb-6">
          <Skeleton className="h-5 w-1/4" /> {/* Skeleton for Features title */}
          <Skeleton className="h-4 w-3/4 mt-2" /> {/* Skeleton for feature list item */}
          <Skeleton className="h-4 w-3/4 mt-2" />
          <Skeleton className="h-4 w-3/4 mt-2" />
        </div>

        <div className="mb-6">
          <Skeleton className="h-5 w-1/4" /> {/* Skeleton for Medical Uses title */}
          <Skeleton className="h-4 w-3/4 mt-2" /> {/* Skeleton for medical uses */}
        </div>

        <div className="mb-6">
          <Skeleton className="h-5 w-1/4" /> {/* Skeleton for Precautions title */}
          <Skeleton className="h-4 w-3/4 mt-2" />
          <Skeleton className="h-4 w-3/4 mt-2" />
          <Skeleton className="h-4 w-3/4 mt-2" />
        </div>

        <div className="mb-6">
          <Skeleton className="h-5 w-1/4" /> {/* Skeleton for Additional Details title */}
          <div className="grid grid-cols-2 gap-4 mt-2">
            <Skeleton className="h-4 w-full" /> {/* Skeleton for manufacturer */}
            <Skeleton className="h-4 w-full" /> {/* Skeleton for dosage */}
            <Skeleton className="h-4 w-full" /> {/* Skeleton for expiry date */}
          </div>
        </div>
      </div>
    );
  }


  if (!details) {
    return (
      <div className="p-6 bg-white shadow-md rounded-md text-center mt-12">
        <p className="text-red-500 text-xl font-semibold">No Details Available</p>
        <p className="text-gray-600 text-lg">Sorry, we couldn't find any details for the requested product.</p>
      </div>
    );  }

  const { features, medicalUses, precautions, manufacturer, dosage, expiryDate, name, description } = details;

  return (
    <div className="p-6 bg-white shadow-md rounded-md mt-12">
      <div className="border-b pb-4 mb-4">
        <h1 className="text-2xl font-bold text-pharma-emerald">{name}</h1>
        <p className="text-gray-600">{description}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Features</h2>
        <ul className="list-disc list-inside mt-2 text-gray-700">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Medical Uses</h2>
        <p className="mt-2 text-gray-700">{medicalUses}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Precautions</h2>
        <ul className="list-disc list-inside mt-2 text-gray-700">
          {precautions.map((precaution, index) => (
            <li key={index}>{precaution}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Additional Details</h2>
        <div className="grid grid-cols-2 gap-4 mt-2 text-gray-700">
          <div>
            <span className="font-semibold">Manufacturer:</span> {manufacturer}
          </div>
          <div>
            <span className="font-semibold">Dosage:</span> {dosage}
          </div>
          <div>
            <span className="font-semibold">Expiry Date:</span> {expiryDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalDetails;
