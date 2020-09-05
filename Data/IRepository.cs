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
using System.Collections.Generic;

namespace Org.Example.Membership.Data
{
  /// <summary>
  /// Contract for data access operations for domain entities of a specified
  /// type.
  /// </summary>
  /// <typeparam name="T">The type of domain entities.</typeparam>
  public interface IRepository<T> where T : Entity
  {
    /// <summary>
    /// Attempts to delete an entity instance identified by its unique
    /// identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the entity instance to
    /// delete.</param>
    /// <returns>The deleted entity instance, if found, <code>null</code>
    /// otherwise.</returns>
    T Delete(Guid id);

    /// <summary>
    /// Finds all entity instances.
    /// </summary>
    /// <returns>An <see cref="IEnumerable"/> of entities.</returns>
    IEnumerable<T> FindAll();

    /// <summary>
    /// Finds an entity instance with a specified unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier for the entity to find.</param>
    /// <returns>The entity with the specified identifier, if valid,
    /// <code>null</code> otherwise.</returns>
    T FindOne(Guid id);

    /// <summary>
    /// Saves an entity and returns the saved instance. If the specified
    /// entity does not have an identifier at the time of saving, a unique
    /// identifier is generated and assigned to it.
    /// </summary>
    /// <param name="entity">The entity to save.</param>
    /// <returns>The saved entity.</returns>
    T Save(T entity);
  }
}