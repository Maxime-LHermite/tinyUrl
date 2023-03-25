import { _TinyUrlUseCase } from '../../../src/domain/tiny-url/TinyUrlUseCase';
import { Ok } from '../../../src/utils/Result';

const makeUseCase = () => {
    const repository = {
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        list: jest.fn(),
    };
    const useCase = new _TinyUrlUseCase(repository);
    return { repository, useCase };
};

describe('AuthenticationUseCase', () => {
    it('Create url', async () => {
        const { useCase, repository } = makeUseCase();
        repository.create.mockResolvedValue(Ok(undefined));
        const result = await useCase.create({ url: 'url', urlName: 'urlName' });
        expect(result).toEqual(Ok(undefined));
        expect(repository.create).toHaveBeenCalledWith({ url: 'url', urlName: 'urlName' });
    });
    it('Update url', async () => {
        const { useCase, repository } = makeUseCase();
        repository.update.mockResolvedValue(Ok(undefined));
        const result = await useCase.update({ url: 'url', urlName: 'urlName', id: 'id' });
        expect(result).toEqual(Ok(undefined));
        expect(repository.update).toHaveBeenCalledWith({ url: 'url', urlName: 'urlName', id: 'id' });
    });
    it('Delete url', async () => {
        const { useCase, repository } = makeUseCase();
        repository.delete.mockResolvedValue(Ok(undefined));
        const result = await useCase.delete('id');
        expect(result).toEqual(Ok(undefined));
        expect(repository.delete).toHaveBeenCalledWith('id');
    });

    it('List urls', async () => {
        const { useCase, repository } = makeUseCase();
        repository.list.mockResolvedValue(Ok([{ id: 'item1' }, { id: 'item2' }, { id: 'item3' }]));
        const result = await useCase.list();
        expect(result).toEqual(Ok([{ id: 'item1' }, { id: 'item2' }, { id: 'item3' }]));
        expect(repository.list).toHaveBeenCalled();
    });
});
