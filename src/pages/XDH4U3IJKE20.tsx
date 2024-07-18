import Layout from "@/components/AdminLayout";
import Sidebar from "@/components/sidebar";
import Link from "next/link";


type Props = {};

const Admin = (props: Props) => {

  return (
    <Layout>
      <main>
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          
          <div className="container mx-auto py-9 md:py-12 px-4 md:px-6">
            <div className="flex items-strech justify-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8">
              <Link href={"/users"} className="md:w-4/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 bg-gray-50 dark:bg-gray-800 py-6 px-6 md:py-0 md:px-4 lg:px-6 flex flex-col justify-center relative">
                <div className="flex flex-col justify-center">
                  <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white">Users</h1>
                  <p className="text-base lg:text-xl text-gray-800 dark:text-white">Count <span className="font-bold">1</span></p>
                </div>
                <div className="flex justify-end md:absolute md:bottom-4 md:right-4 lg:bottom-0 lg:right-0">
                  <img src="/small.png" alt="" className="md:w-20 md:h-20 lg:w-32 lg:h-36" />
                </div>
              </Link>
              <Link href={"/cities"}  className="md:w-4/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 bg-gray-50 dark:bg-gray-800 py-6 px-6 md:py-0 md:px-4 lg:px-6 flex flex-col justify-center relative">
                <div className="flex flex-col justify-center">
                  <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white">Cities</h1>
                  <p className="text-base lg:text-xl text-gray-800 dark:text-white">Count <span className="font-bold">1</span></p>
                </div>
                <div className="flex justify-end md:absolute md:bottom-4 md:right-4 lg:bottom-0 lg:right-0">
                  <img src="/city.png" alt="" className="md:w-20 md:h-20 lg:w-32 lg:h-36" />
                </div>
              </Link>
              <Link href={"/travelstyle"}  className="md:w-4/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 bg-gray-50 dark:bg-gray-800 py-6 px-6 md:py-0 md:px-4 lg:px-6 flex flex-col justify-center relative">
                <div className="flex flex-col justify-center">
                  <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white">Destinations</h1>
                  <p className="text-base lg:text-xl text-gray-800 dark:text-white">Count <span className="font-bold">1</span></p>
                </div>
                <div className="flex justify-end md:absolute md:bottom-4 md:right-4 lg:bottom-0 lg:right-0">
                  <img src="/location.png" alt="" className="md:w-20 md:h-20 lg:w-32 lg:h-32" />
                </div>
              </Link>
              <Link href={"/hotels"}  className="md:w-4/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 bg-gray-50 dark:bg-gray-800 py-6 px-6 md:py-0 md:px-4 lg:px-6 flex flex-col justify-center relative">
                <div className="flex flex-col justify-center">
                  <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white">Hotels</h1>
                  <p className="text-base lg:text-xl text-gray-800 dark:text-white">Count <span className="font-bold">1</span></p>
                </div>
                <div className="flex justify-end md:absolute md:bottom-4 md:right-4 lg:bottom-0 lg:right-0">
                  <img src="/hotel.png" alt="" className="md:w-20 md:h-20 lg:w-32 lg:h-36" />
                </div>
              </Link>
            </div>
          </div>

          {/* <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Name
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Date of Birth
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Role
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Salary
                      </th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        John Doe
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">Web Developer</td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">$120,000</td>
                      <td className="whitespace-nowrap px-4 py-2">
                        <a
                          href="#"
                          className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                        >
                          View
                        </a>
                      </td>
                    </tr>

                    <tr>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Jane Doe
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">04/11/1980</td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">Web Designer</td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">$100,000</td>
                      <td className="whitespace-nowrap px-4 py-2">
                        <a
                          href="#"
                          className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                        >
                          View
                        </a>
                      </td>
                    </tr>

                    <tr>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Gary Barlow
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">Singer</td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">$20,000</td>
                      <td className="whitespace-nowrap px-4 py-2">
                        <a
                          href="#"
                          className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
          </div> */}

        </div>
      </main>
  </Layout>
  );
};

export default Admin;