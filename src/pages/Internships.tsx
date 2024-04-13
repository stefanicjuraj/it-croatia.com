import { useState } from 'react';
// Hooks
import { useInternship } from '../hooks/useInternship';
// Components
import Loading from '../components/Loading';
import Header from '../components/Internship/Header';
import { Search } from '../components/Search';
import TableHead from '../components/Internship/TableHead';
import { TableBody } from '../components/Internship/TableBody';
import Footer from '../components/Footer';

export default function Internships() {
    const { internship, loading, error } = useInternship();
    const [internshipSearch, setInternshipSearch] = useState("");

    const searchInternship = internship.filter((internship) => {
        const internshipName = internship.Internship.toLowerCase();
        const search = internshipSearch.toLowerCase();
        return internshipName.includes(search);
    });

    if (error) {
        return <div>Error</div>;
    }

    return (
        <>
            <Header />
            {loading ? (
                <Loading />
            ) : (
                <>
                    <section className="relative px-4 mx-auto max-w-screen-xl sm:px-0 animation glow delay-1">
                        <div className="flex flex-wrap items-center mb-8 sm:flex-nowrap">
                            <div className="relative mr-4 text-white sm:w-96 w-80">
                                <Search
                                    onSearchChange={setInternshipSearch}
                                    placeholder="Search internships"
                                />
                                <p className="absolute right-2 bottom-2 bg-[#333] rounded-full px-5 py-2">
                                    {searchInternship.length} results
                                </p>
                            </div>
                        </div>
                    </section>
                    <section className="px-4 mx-auto mb-40">
                        <div className="mx-auto overflow-x-auto max-w-screen-xl rounded-t-xl rounded-b-xl">
                            <table className="w-full text-left text-white">
                                <TableHead />
                                <TableBody internships={searchInternship} />
                            </table>
                        </div>
                    </section>
                </>
            )}

            <Footer />

        </>
    )
}
