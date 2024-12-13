import React, { useState } from 'react';

interface FormField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  rows?: number;
}

interface ReusableFormProps {
  fields: FormField[];
  onSubmit: (formData: any) => void;
  loading: boolean;
  successMessage?: string;
  errorMessage?: string;
}

const ReusableForm: React.FC<ReusableFormProps> = ({
  fields,
  onSubmit,
  loading,
  successMessage,
  errorMessage,
}) => {
  const [formData, setFormData] = useState<any>({});
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        {successMessage && (
          <div className="text-green-600 text-center mb-4">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="text-red-600 text-center mb-4">{errorMessage}</div>
        )}
        {fields.map((field) => (
          <div key={field.name} className="mb-4">
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700"
            >
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                id={field.name}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleInputChange}
                rows={field.rows || 4}
                required={field.required}
                className="w-full px-4 py-2 mt-2 border rounded-lg"
              />
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleInputChange}
                required={field.required}
                className="w-full px-4 py-2 mt-2 border rounded-lg"
              />
            )}
          </div>
        ))}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-6 py-2 mt-4 text-white font-semibold rounded-lg ${
              loading ? 'bg-gray-400' : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {loading ? 'Sending...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReusableForm;
