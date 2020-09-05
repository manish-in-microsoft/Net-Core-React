///
/// Permission is hereby granted, free of charge, to any person obtaining a copy of
/// this software and associated documentation files (the "Software"), to deal in the
/// Software without restriction, including without limitation the rights to use, copy,
/// modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
/// and to permit persons to whom the Software is furnished to do so, subject to the
/// following conditions:
///
/// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
/// INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
/// PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
/// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
/// CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
/// OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
///

using Org.Example.Membership.Domain;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;

namespace Org.Example.Membership.Data
{
  /// <summary>
  /// An in-memory repository of domain entities of a specified type.
  /// </summary>
  /// <typeparam name="T">The type of domain entities.</typeparam>
  public abstract class InMemoryRepository<T> : IRepository<T> where T : Entity
  {
    private static readonly ConcurrentDictionary<Guid, T> STORE = new ConcurrentDictionary<Guid, T>();

    /// <summary>
    /// Attempts to delete an entity instance identified by its unique
    /// identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the entity instance to
    /// delete.</param>
    /// <returns><code>true</code> if the entity instance was found and was
    /// deleted successfully, <code>false</code> otherwise.</returns>
    public T Delete(Guid id)
    {
      if (id == null || !STORE.ContainsKey(id))
      {
        return null;
      }

      STORE.TryRemove(id, out T record);

      return record;
    }

    /// <summary>
    /// Finds all entity instances.
    /// </summary>
    /// <returns>An <see cref="IEnumerable"/> of entities.</returns>
    public IEnumerable<T> FindAll()
    {
      return STORE.Values;
    }

    /// <summary>
    /// Finds an entity instance with a specified unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier for the entity to find.</param>
    /// <returns>The entity with the specified identifier, if valid,
    /// <code>null</code> otherwise.</returns>
    public T FindOne(Guid id)
    {
      return id != null && STORE.ContainsKey(id) ? STORE[id] : null;
    }

    /// <summary>
    /// Saves an entity and returns the saved instance. If the specified
    /// entity does not have an identifier at the time of saving, a unique
    /// identifier is generated and assigned to it.
    /// </summary>
    /// <param name="entity">The entity to save.</param>
    /// <returns>The saved entity.</returns>
    public T Save(T entity)
    {
      if (entity != null)
      {
        if (entity.IsNew)
        {
          // Assign an identifier to the entity, if not already assigned.
          entity.ID = Guid.NewGuid();
        }

        STORE[entity.ID] = entity;
      }

      return entity;
    }
  }
}