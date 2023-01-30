import { observable } from 'mobx';
import { Company } from '@/types';

const companyStore = observable({} as Record<string, Company>);

export const getCompany = (id: string) => companyStore[id] || {};

export const addUpdateCompany = (company: Company) => {
    companyStore[company.companyId] = company;
};

export const addUpdateCompanies = (companies: Company[]) => {
    companies.forEach(addUpdateCompany);
};

export const clearCompanies = () => {
    for (let key of Object.keys(companyStore)) {
        delete companyStore[key];
    }
};

export default companyStore;