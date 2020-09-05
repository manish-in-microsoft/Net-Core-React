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

using Microsoft.AspNetCore.Mvc;
using Org.Example.Membership.Data;
using Org.Example.Membership.Domain;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Org.Example.Membership.Controller
{
  /// <summary>
  /// Controller for managing <see cref="Entity"/> instances.
  /// </summary>
  /// <typeparam name="T">The type of entities to manage.</typeparam>
  [ApiController]
  [Route("api/[controller]")]
  public abstract class EntityController<T> : ControllerBase where T : Entity
  {
    private readonly IRepository<T> repository;

    /// <summary>
    /// Creates a controller, delegating to an <see cref="IRepository"/> for
    /// actual management of the entity instances.
    /// </summary>
    /// <param name="repository">The repository to use for managing entity
    /// instances.</param>
    public EntityController(IRepository<T> repository)
    {
      this.repository = repository;
    }

    /// <summary>
    /// Gets an entity instance with a specified unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier for the entity to find.</param>
    /// <returns>The deleted entity.</returns>
    /// <example>DELETE: /api/[controller]/1</example>
    [HttpDelete("{id}")]
    public ActionResult<T> Delete(Guid id)
    {
      return repository.Delete(id);
    }

    /// <summary>
    /// Deletes an entity instance with a specified unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier for the entity to delete.</param>
    /// <returns>The entity with the specified identifier, if valid,
    /// <code>null</code> otherwise.</returns>
    /// <example>GET: /api/[controller]/1</example>
    [HttpGet("{id}")]
    public ActionResult<T> Get(Guid id)
    {
      return repository.FindOne(id);
    }

    /// <summary>
    /// Adds a new entity instance.
    /// </summary>
    /// <param name="entity">The entity instance to add.</param>
    /// <returns>The added entity instance.</returns>
    /// <example>POST: /api/[controller]</example>
    [HttpPost]
    public ActionResult<T> Insert(T entity)
    {
      return repository.Save(entity);
    }

    /// <summary>
    /// Gets all entity instances.
    /// </summary>
    /// <returns>An <see cref="IEnumerable"/> of entities.</returns>
    /// <example>GET: /api/[controller]</example>
    [HttpGet]
    public ActionResult<IEnumerable<T>> List()
    {
      return repository.FindAll().ToList();
    }

    /// <summary>
    /// Updates an entity instance.
    /// </summary>
    /// <param name="id">The unique identifier for the entity to update.</param>
    /// <param name="entity">The entity instance to update.</param>
    /// <returns>The updated entity instance.</returns>
    /// <example>PUT: /api/[controller]/1</example>
    [HttpPut("{id}")]
    public ActionResult<T> Update(Guid id, T entity)
    {
      if (entity != null)
      {
        entity.ID = id;
      }

      return repository.Save(entity);
    }
  }
}