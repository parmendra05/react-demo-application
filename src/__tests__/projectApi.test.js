import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchProjects, createProject, updateProject, deleteProject } from '../api/projectApi';

const mockProject = { id: 1, name: 'Test', manager: 'Alice', status: 'In Progress', deadline: '2025-12-01', description: '' };

function mockFetch(status, body = null) {
  global.fetch = vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    statusText: 'OK',
    json: () => Promise.resolve(body),
  });
}

describe('projectApi', () => {
  beforeEach(() => vi.restoreAllMocks());

  describe('fetchProjects', () => {
    it('returns projects on success', async () => {
      mockFetch(200, [mockProject]);
      const result = await fetchProjects();
      expect(result).toEqual([mockProject]);
      expect(fetch).toHaveBeenCalledWith('/api/projects');
    });

    it('throws on error response', async () => {
      mockFetch(500);
      await expect(fetchProjects()).rejects.toThrow('API error: 500');
    });
  });

  describe('createProject', () => {
    it('posts and returns new project', async () => {
      mockFetch(201, mockProject);
      const result = await createProject(mockProject);
      expect(result).toEqual(mockProject);
      expect(fetch).toHaveBeenCalledWith('/api/projects', expect.objectContaining({ method: 'POST' }));
    });
  });

  describe('updateProject', () => {
    it('puts and returns updated project', async () => {
      mockFetch(200, mockProject);
      const result = await updateProject(1, mockProject);
      expect(result).toEqual(mockProject);
      expect(fetch).toHaveBeenCalledWith('/api/projects/1', expect.objectContaining({ method: 'PUT' }));
    });
  });

  describe('deleteProject', () => {
    it('sends DELETE and returns null on 204', async () => {
      mockFetch(204);
      const result = await deleteProject(1);
      expect(result).toBeNull();
      expect(fetch).toHaveBeenCalledWith('/api/projects/1', { method: 'DELETE' });
    });
  });
});
