import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";


export default function Branded() {
  const [name, setName] = useState('');
  const [branded, setBranded] = useState([]);
  const [parentBrand, setParentBrand] = useState('');
  const [editedBrand, setEditedBrand] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    fetchBranded();
  }, []);

  function fetchBranded() {
    axios.get('/api/branded').then(result => {
      setBranded(result.data)
    })
  }

  async function saveBrand(ev) {
    ev.preventDefault();
    const data = { name, parentBrand }
    if (editedBrand) {
      data._id = editedBrand._id
      await axios.put('/api/branded', data);
      setEditedBrand(null);
      toast.success('Brand updated!!')
    } else {
      await axios.post('/api/branded', data);
      toast.success('Brand created successfully')
    }
    setName('')
    setParentBrand('')
    fetchBranded();
  }

  function editBrand(brand) {
    setEditedBrand(brand);
    setName(brand.name);
    setParentBrand(brand.parent?._id)
  }

  async function deleteBrand(brand) {
    const { _id } = brand;
    await axios.delete('/api/branded?_id=' + _id);
    closeModal();
    fetchBranded();
    toast.success('Brand deleted!!')
  }

  return <>
    <header>
      <div className="mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex max-sm:flex-col sm:items-center sm:justify-between items-center">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-3xl">
              All Brand
            </h1>
            <p className="mt-1.5 text-md text-gray-500">
              <span>
                {editedBrand ? (
                  <>
                    Editing Brand,{' '}
                    <span className="text-green-600 font-bold">{editedBrand.name}</span>  &nbsp;
                    <span className="text-blue-500 font-bold">{editedBrand?.parent?.name}</span>
                  </>
                ) : (
                  'Create a new Brand!'
                )}
              </span>

            </p>
          </div>

          <form onSubmit={saveBrand} className="mt-4 flex max-sm:flex-col gap-4 sm:mt-3 max-sm:px-4  sm:items-center">
            <div >
              <div class="relative">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2.5 text-gray-500">+</div>
                <div class="absolute inset-y-0 right-0 flex items-center text-gray-500">
                  <select class="h-full rounded-md border-transparent bg-transparent py-0 pl-3  pr-7 text-gray-500 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    value={parentBrand}
                    onChange={ev => setParentBrand(ev.target.value)}
                  >
                    <option>No parent</option>
                    {branded.length > 0 && branded.map(brand => (
                      <option key={brand._id} value={brand._id}>{brand.name}</option>
                    ))}
                  </select>
                </div>
                <input type="text" id="example11" class="block w-[400px] rounded-md border border-slate-300 py-2.5 pl-8 pr-16 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="Brand Name"
                  value={name}
                  onChange={ev => setName(ev.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" class="rounded-lg border border-blue-100 bg-blue-100 px-5 py-3 text-center text-sm font-medium text-blue-600 transition-all hover:border-blue-200 hover:bg-blue-200 focus:ring focus:ring-blue-50 disabled:border-blue-50 disabled:bg-blue-50 disabled:text-blue-400">
              {editedBrand ? 'Save changes' : 'Save Brand'}
            </button>
          </form>
        </div>
        <hr className="my-8 h-px border-0 bg-gray-300" />
      </div>
    </header>

    <div className="overflow-x-auto mx-auto p-4">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-md border rounded">
        <thead>
          <tr>
            <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-start font-bold">
              #
            </th>
            <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-start font-bold">
              Brand Name
            </th>
            <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-start font-bold">
              Parent Brand
            </th>
            <th className="px-4 py-2 whitespace-nowrap text-gray-900 text-start font-bold">Status</th>
          </tr>
        </thead>
        {branded.map((brand, index) => (
          <tbody key={brand._id} className="divide-y divide-gray-200" >
            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {index + 1}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700"> {brand.name} </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700"> {brand?.parent?.name} </td>
              <td className="whitespace-nowrap px-4 py-2 gap-4 flex">
                <Link
                  onClick={() => editBrand(brand)}
                  href={'/branded'}
                  className="inline-block rounded bg-green-500 px-4 py-2 text-xs font-medium text-white hover:bg-green-700"
                >
                  Edit
                </Link>
                <div
                  onKeyDown={() => setShowModal(false)}
                  className="inline-block rounded bg-red-600 text-xs font-medium text-white hover:bg-red-700"
                >
                  <button onClick={toggleModal} className="px-4 py-2">
                    Delete
                  </button>
                  {showModal && (
                    <>
                      <div className="fixed inset-0 z-10 bg-gray-300/50"></div>
                      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                        <div className="mx-auto w-full overflow-hidden rounded-lg bg-white shadow-xl sm:max-w-sm">
                          <div className="relative p-5">
                            <div className="text-center">
                              <div className="mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                              </div>
                              <div>
                                <h3 className="text-lg font-medium text-gray-900">Delete blog post</h3>
                                <div className="mt-2 text-sm text-gray-500 max-w-sm">Are you sure you want to delete this {brand?.name}?</div>
                              </div>
                            </div>
                            <div className="mt-5 flex justify-end gap-3">
                              <button onClick={closeModal} className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 focus:ring focus:ring-gray-100 disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400">Cancel</button>
                              <button className="flex-1 rounded-lg border border-red-500 bg-red-500 px-4 py-2 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700 focus:ring focus:ring-red-200 disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-300"
                                onClick={() => deleteBrand(brand)}
                              >Delete</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        ))}
      </table>


    </div>


  </>
}